import levelerImage from "../assets/leveler.png";
import miniGolfImage from "../assets/mini_golf.png";
import harborCurrentsImage from "../assets/harbor_currents.jpg";
import jobApplicationTrackerImage from "../assets/job_application_tracker.png";
import tkinterMinesweeperImage from "../assets/tkinter_minesweeper.png";

interface ProjectPublic {
    title : string,
	description : string,
	image : string,
	github : string
}

interface ProjectPrivate {
    title : string,
	description : string,
	image : string,
	gist : string
}

type Project = ProjectPrivate | ProjectPublic;

export const projects : Project[] = [
	{
        title : "Leveler",
        description: "A video game review site",
        image: levelerImage.src,
        github: "jack-kraus/game-tracker"
    },
	{
        title : "Harbor Currents",
        description: "A navigation app",
        image: harborCurrentsImage.src,
        gist: "b13f352220d2e8cb5869ca55bd73ef3e/raw"
    },
	{
        title : "Mini Golf",
        description: "An html5 canvas game",
        image: miniGolfImage.src,
        github: "jack-kraus/Mini-Golf-Game"
    },
	{
        title : "Job Application Tracker",
        description: "A tracker for applications",
        image: jobApplicationTrackerImage.src,
        github: "CS546-Team23/Job-Application-Tracker"
    },
	{
        title : "Tkinter Minesweeper",
        description: "A minesweeper game in Python",
        image: tkinterMinesweeperImage.src,
        github: "jack-kraus/Tkinter-Minesweeper"
    },
    {
        title: "Portfolio Site",
        description: "A portfolio site made in Astro",
        image: levelerImage.src,
        github: "jack-kraus/portfolio-site"
    }
];