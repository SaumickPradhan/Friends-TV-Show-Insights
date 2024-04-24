# Geting To Know Your F.R.I.E.N.D.S!



**A Interactive Data Visualization exploring various ascpects of the Hit TV show Friends. It helps the audience understand  the characters, how the characters interact, what they characters tend to say, and how these patterns change over the run of the show.**

<img width="323" alt="image" src="https://github.com/SaumickPradhan/Friends-TV-Show-Insights/assets/85262444/4e32d897-c555-4291-95a4-b2a25e97f6fc">

![newApr-24-202400-16-19-ezgif com-video-to-gif-converter](https://github.com/SaumickPradhan/Friends-TV-Show-Insights/assets/85262444/9554eadf-1683-420e-b4d1-caec30d4c295)


<h2>Description</h2>

In our project, "Friends-TV-Show-insights" , we embarked on a journey to explore various different interactions between charachters for the popular TV sitcom, 'Friends'. THe datasets used in this project were found on Kaggle and then was preprocessed using python and converted to JSON for ease of use. The datasets, spam over the 10 seasons that the show ran for, and provide information related to the emotions of the cast, phrases used by the cast, and overall interactions between the charachters. We filtered the data to provide us with more detailed information, and analyzied and displayed it using a Heatmap, arcmap, various bar charts and 2 word clouds.

<h2>Video Presentation</h2>

https://www.youtube.com/watch?v=2hE0KSeTbSc&t=4s

<h2>Check It Out</h2>

https://knowyourfriends.netlify.app/

<h2>Getting Started</h2>

Navigate to your folder. Eg: for home directory

```
cd ~
```

Clone the repository

```
git clone https://github.com/SaumickPradhan/Friends-TV-Show-Insights
```

Run the Application locally with localhost or using the deployment

<h2>Data Source</h2>

This data is pulled from the following sources:

* https://www.kaggle.com/datasets/sujaykapadnis/friends?select=friends_emotions.csv
* https://www.kaggle.com/datasets/rezaghari/friends-series-dataset?select=friends_episodes_v3.csv
* https://convokit.cornell.edu/documentation/friends.html

Methods used for preprocessing:
* MS Excel
* Java Script filtering into JSON
* Python Pandas and json modules

Please find all the data preprocessing scripts and data files in the /data folder.  Various resources helped us get different aspect of the project. We used different files for different visualizations. 

<details>
<summary><b>Following are the attributes used</b></summary>

| Entity           | Class   | Description                                       |
|------------------|---------|---------------------------------------------------|
| character        | string  | Name of the character                             |
| lines_spoken     | integer | Number of lines spoken by the character           |
| words_spoken     | integer | Total words spoken by the character               |
| emotions         | string  | Emotions expressed by the character               |
| seasons          | string  | Seasons in which the character appears           |
| scenes           | integer | Number of scenes the character appears in         |
| episodes         | integer | Number of episodes the character appears in       |
| location         | string  | Location of the scene or interaction              |
| char_interaction | string  | ID or label for character interaction             |
| scene_members    | string  | Other characters in the scene                     |


</details>



 <details>
  <summary><b>Motivation of the Project </b></summary>

The motivation for this project was to showcase information about the show "Friends", and add to the an already large body of knowledge publically avilable for the enthusiasts of the show. We also wanted to hone our data analysis skills in front-end frameworks like D3.JS and D3.Wordcloud.js along with using python to preprocess and clean the data. The dataset that we used also has ratings from real people via a reputable website.

</details>


<details><summary><b>Design Sketches</b></summary>



**UI sketches**

<img width="553" alt="image" src="https://github.com/SaumickPradhan/Friends-TV-Show-Insights/assets/85262444/45776895-8583-48c7-8153-fa64dde95dda">

<img width="600" alt="image" src="https://github.com/SaumickPradhan/Friends-TV-Show-Insights/assets/85262444/40dc4b91-f40c-4290-a68d-d5d0ce506c5a">




**B Goals sketches**

<img width="660" alt="image" src="https://github.com/SaumickPradhan/Friends-TV-Show-Insights/assets/88009707/71c16ba6-1e67-457c-8e5e-60b55cf2c4f6">

**A goals**

<img width="660" alt="image" src="https://github.com/SaumickPradhan/Friends-TV-Show-Insights/assets/85262444/16327b12-a5dd-4660-8a30-634b9f31cdf2">

<img width="777" alt="image" src="https://github.com/SaumickPradhan/Friends-TV-Show-Insights/assets/85262444/7f2dba9e-94f9-4488-818b-d85b6051179b">

<img width="660" alt="image" src="https://github.com/SaumickPradhan/Friends-TV-Show-Insights/assets/88009707/3ebb1cef-a7a7-45c3-95da-f8bd43a943cc">




</details>

<details><summary><b>Design Specification</b></summary>

* Used a linear page scrollable format (changed our original grid based format) as we wanted a linear story flow of selections instead of multiple views together. This facilitiates our story flow during our case studies and findings, mentioned later. 
* Have a story-like feel with the ability to select the episodes and season which is tracked on the top
* Intutive tool tips on all
* More info about design specifications to follow

</details>

<h2>Visualization components</h2>

<details>
  <summary><b>1. Heading with Title Track Playing to show Friends Theme</b> </summary>
  
  <b>C Goals Heading with Intro for the show. The title show song plays in the background with a music player</b>

<img width="791" alt="image" src="https://github.com/SaumickPradhan/Friends-TV-Show-Insights/assets/85262444/7868fa55-a9eb-4a10-8601-2f9001ab7caa">

</details>


<details>
  <summary><b>2. Character, their popularity, influence in the show</b> </summary>
  
  <b>Graph which shows the popularity of the Character is a particular Episode</b>
    **Reason:** Helps the user understand which character is prominant in a particular episode and season. They can shoose to watch one with their favourite character.
<img width="568" alt="image" src="https://github.com/SaumickPradhan/Friends-TV-Show-Insights/assets/85262444/35cbc43b-1bc8-479b-b32b-210b0544a827">


</details>


<details>
  <summary><b>3. Color Section </b> </summary>
  
We decided to go with the famous color pallete from Friends which is Red, yellow and blue across all the Viz. Hence our hover is also one of these colors.
</details>


<details>
  <summary><b>4. Select Season and Episode</b> </summary>
  <b>  Dynamic dropdown to select season and episode from that season. The Arc Diagram, Popularity bar graph and emotions bar graphs are Linked</b>


<img width="396" alt="image" src="https://github.com/SaumickPradhan/Friends-TV-Show-Insights/assets/85262444/922adc58-09ce-4f8f-82bc-97132bc4090c">


</details>


<details>
  <summary><b>5. Series Road Map with Popularity Heat Map</b> </summary>
  <b> Helps the user see the road map for the show, find out interesting episodes, their popularity based on Ratings by viewers talking about them "lines spoken" </b>
 
 **Reason:** Helps users select which episode they want to watch based on popularity.
 
<img width="1006" alt="image" src="https://github.com/SaumickPradhan/Friends-TV-Show-Insights/assets/85262444/22457ca8-8fde-4e02-bec8-703dd631c806">

</details>



<details>
  <summary><b>6. Inter Character Interaction per Episode with Arc Diagram</b> </summary>
  <b> An Arc diagram to show relation between different characters in the selected episode. 
   
  **Reason:** We decided to also include supporting characters to show interesting charaters in each episode and how they interate with the main characters. A Tool tip shows the interactions of the character with other characters and the scenes they are together.</b>

<img width="1197" alt="image" src="https://github.com/SaumickPradhan/Friends-TV-Show-Insights/assets/85262444/ca2a5810-9d8e-47a4-88c4-8cbabd66a6bb">

</details>


<details>
  <summary><b>7. Emotions between Characters in selected episode</b> </summary>

  
  <b> Bar chart for showing general emotions of characters in a particular episode.</b>

  **Reason:** This is really intereting as the users can filter which episode to watch based on the general emotion in the episode between charactes.

<img width="580" alt="image" src="https://github.com/SaumickPradhan/Friends-TV-Show-Insights/assets/85262444/01b975fe-2c9d-4b41-ab27-27c7f9b642de">

</details>



<details>
<summary><b>8. Select Two Characters</b></summary>
<b>Select the characters you want to focus on</b>
<img width="400" alt="image" src="https://github.com/SaumickPradhan/Friends-TV-Show-Insights/assets/85262444/c41ad58f-eb6d-48e8-a554-23425c548b0b">



</details>


<details>
<summary><b>9. Word cloud and graph for the top words spoken by the selected character</b></summary>
<b>Shows the top used words and thier frequency for the selected character</b>

<img width="1459" alt="image" src="https://github.com/SaumickPradhan/Friends-TV-Show-Insights/assets/85262444/cb4635ec-b460-4688-a3a4-6448ed174a42">

</details>

<details>
<summary><b>10. Comparing interactions with another character</b></summary>
<b>Shows the top used words between the selected characters in conversation with each other. First plot starts of as solo interaction.</b>

<img width="1395" alt="image" src="https://github.com/SaumickPradhan/Friends-TV-Show-Insights/assets/85262444/0a255085-ed36-469a-9d16-c6207a8d9274">

</details>



<h2>Interesting Findings from the Application</h2>

<details>
<summary><b>Popularity of Monica</b></summary>
<b>Even though the story does not evlove around Monica, she is the most popular character in the show throughout episodes</b>

<img width="597" alt="image" src="https://github.com/SaumickPradhan/Friends-TV-Show-Insights/assets/85262444/be7b222a-ea4b-409d-a966-fac739214f9e">


</details>

<details>
<summary><b>Top Hits</b></summary>
  
<b>Along with the season finales, the biggests hit was the "One that could have been" episode as it had the Biggest Cliff hanger in the history of modern Sitcoms</b>

<img width="990" alt="image" src="https://github.com/SaumickPradhan/Friends-TV-Show-Insights/assets/85262444/48ca0abd-ad5f-4f0f-87ce-5834d5f1a4e4">

  
</details>

<details>
<summary><b>Chandler alays close to Monica!</b></summary>
<b>Chandler has always spent most of his scenes with Monica since the beginning, hinting at the future plot of their relationship</b>
  
<img width="1014" alt="image" src="https://github.com/SaumickPradhan/Friends-TV-Show-Insights/assets/85262444/2aef6d8a-3ba1-4d60-aa25-01aa3cb2c498">


</details>


<details>
<summary><b>A joyfull show</b></summary>
<b> Most of the seasons finales are "Joyful" which tells a lot about the shows theme</b>

  <img width="588" alt="image" src="https://github.com/SaumickPradhan/Friends-TV-Show-Insights/assets/85262444/59a3f469-c516-4f84-a429-89887db8d160">


</details>

<details>
<summary><b>Ross and Rachel</b></summary>
<b> Both of their common words have always been each others names, which shows their relation <b>
 
<img width="1382" alt="image" src="https://github.com/SaumickPradhan/Friends-TV-Show-Insights/assets/85262444/349579b3-25d4-45c9-a6fc-4d2024029b70">

</details>




<h2>Application Architecture </h2>

<details>
<summary><b>Libraries Used</b></summary>
 
- [Javascript D3](https://d3js.org/)
   
- [WordCloud](https://github.com/jasondavies/d3-cloud)
</details>




<details>
<summary><b>Future works</b></summary>
<b>1. </b> looking at a way add location specific data

<b>2. </b> creating a way to add episode links to the heatmap

<b>3. </b> Improve styling and spacing in the page
  
</details>




 <details>
  <summary><b>Task Distribution</b></summary>

  <b> Here are the components worked on by the Team:</b>
  
  *  Introduction, title and Refresh: Saumick
  *  Song in background: Saumick
  *  Populariy of Character graph: Saumick
  *  Main drop downs: Saumick
  *  Data preprocessing: Nachiket and Saumick
  *  Heatmap Series Road Map with Popularity: Saumick
  *  Inter Character Interaction per Episode: Saumick
  *  Graph Top Emotions between Characters: Saumick
  *  Character drop downs: Nachiket
  *  Solo Word cloud: Nachiket
  *  Character freq bar chart: Nachiket
  *  Word Cloud for character interaction: Nachiket
  *  CSS, coloring and formatting maps: Saumick + Nachiket
  *  Documentation: Saumick + Nachiket
  *  UI Sketches: Saumick + Nachiket
    
 </details>
