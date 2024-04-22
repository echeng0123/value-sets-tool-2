<h1>Value Set Tool</h1>

<h3>This took allows users to find, view, compare, and select appropriate value sets for further use by combining data across 2 databases.</h3>

<h4>Tech Stack: React | Javascript | HTML/CSS | Node.js | Express | PostgreSQL | Material UI | Vite </h4>

<h3>To test out this repo on your local machine, do the following:</h3>
<h5>Note: this will only work if you have PostgreSQL installed already on your computer.</h5>
<ul>
  <li>Fork this repository</li>
  <li>Download the two files onto your computer (and unzip the folder) <a href="https://drive.google.com/drive/u/2/folders/1qHON2sVLytSELlCUp4rHicKUXZ1Bg5iw">here</a></li>
  <li>In VSCode, open 2 terminals - one named "server" and one named "client"</li>
  <li>In both terminals, run <b>npm i</b>
  <li>In the server terminal, run the following: <b>psql CREATE DATABASE valuesets2</b>. While still in psql, then run <b>\c valuesets2</b>. Your terminal should say "You are now connected to database "valuesets2" as user "[username]".</li>
  <li>In the server terminal, change directory (cd) into the server folder. Run the following: <b>npm run seed</b>, then run <b>npm run start</b></li>
  <li>In the client terminal, change directory (cd) into the client folder. Run the following: <b>npm run dev</b> and follow the URL to the localhost.</li>
</ul>
