from flask import Flask, send_from_directory
from app import create_app
import os

app = create_app()

# React build folder path
BUILD_FOLDER = os.path.join(os.path.dirname(os.path.abspath(__file__)), "build")


@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve(path):
    """
    Serve React frontend from build folder
    """
    full_path = os.path.join(BUILD_FOLDER, path)

    # If request is for an existing file (js, css, images...)
    if path != "" and os.path.exists(full_path):
        return send_from_directory(BUILD_FOLDER, path)

    # Otherwise always return index.html
    return send_from_directory(BUILD_FOLDER, "index.html")


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
