"""
from flask import Flask, request, jsonify
import speech_recognition as sr

app = Flask(__name__)

@app.route('/process_audio', methods=['POST'])
def process_audio():
    try:
        # Check if audio file is present in the request
        if 'audio' not in request.files:
            return jsonify({'error': 'No audio file found'}), 400

        audio_file = request.files['audio']

        # Initialize recognizer class (for recognizing the speech)
        recognizer = sr.Recognizer()

        # Load audio file
        with sr.AudioFile(audio_file) as source:
            audio_data = recognizer.record(source)

        # Recognize speech using Google Speech Recognition
        text = recognizer.recognize_google(audio_data)

        return jsonify({'text': text}), 200

    except sr.UnknownValueError:
        return jsonify({'error': 'Google Speech Recognition could not understand the audio'}), 500

    except sr.RequestError as e:
        return jsonify({'error': f'Could not request results from Google Speech Recognition service; {e}'}), 500

    except Exception as e:
        return jsonify({'error': f'Error: {e}'}), 500

if __name__ == '__main__':
    app.run(debug=True)
    
    """
    
# process_audio.py
from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
import os
import speech_recognition as sr

app = Flask(__name__)

UPLOAD_FOLDER = './uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Initialize the speech recognition recognizer
recognizer = sr.Recognizer()

@app.route('/process-audio', methods=['POST'])
def process_audio():
    if 'audio' not in request.files:
        return jsonify({'error': 'No audio file found'}), 400
    
    audio_file = request.files['audio']
    if audio_file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    filename = secure_filename(audio_file.filename)
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    audio_file.save(filepath)

    # Use speech recognition to convert audio to text
    try:
        with sr.AudioFile(filepath) as source:
            audio_data = recognizer.record(source)
            text = recognizer.recognize_google(audio_data)
            return jsonify({'text': text}), 200
    except sr.UnknownValueError:
        return jsonify({'error': 'Speech recognition could not understand audio'}), 500
    except sr.RequestError as e:
        return jsonify({'error': f'Speech recognition service error: {e}'}), 500
    except Exception as e:
        return jsonify({'error': f'Error processing audio: {str(e)}'}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
