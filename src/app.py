from flask import Flask, render_template, request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from flask import render_template, request, redirect, url_for

app = Flask(__name__)

# -------------------------------
# Database connection
# -------------------------------
app.config['SQLALCHEMY_DATABASE_URI'] = (
    "postgresql://timelines_user:timelines_pass@localhost:5432/timelines"
)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# -------------------------------
# Models
# -------------------------------


class Timeline(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)
    events = db.relationship('Event', backref='timeline', cascade="all, delete-orphan")


class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    timeline_id = db.Column(db.Integer, db.ForeignKey('timeline.id'), nullable=False)
    name = db.Column(db.String(200), nullable=False)
    start_date = db.Column(db.String(50))
    end_date = db.Column(db.String(50))
    descr = db.Column(db.Text)


@app.route("/")
def home():
    timelines = Timeline.query.all()
    return render_template("index.html", timelines=timelines)


@app.route("/add_timeline", methods=["GET", "POST"])
def add_timeline():
    if request.method == "POST":
        title = request.form["title"]
        description = request.form["description"]
        new_timeline = Timeline(title=title, description=description)
        db.session.add(new_timeline)
        db.session.commit()
        return redirect(url_for("home"))
    return render_template("add_timeline.html")


@app.route("/add_event/<int:timeline_id>", methods=["GET", "POST"])
def add_event(timeline_id):
    timeline = Timeline.query.get_or_404(timeline_id)
    if request.method == "POST":
        name = request.form["name"]
        start_date = request.form["start_date"]
        end_date = request.form["end_date"]
        descr = request.form["descr"]
        new_event = Event(timeline_id=1, name=name, start_date=start_date, end_date=end_date, descr=descr)
        db.session.add(new_event)
        db.session.commit()
        return redirect(url_for("home"))
    return render_template("add_event.html", timeline=timeline)
