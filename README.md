# Geting To Know Your F.R.I.E.N.D.S



**A Interactive Data Visualization exploring various ascpects of the Hit TV show Friends. It helps the audience understand  the characters, how the characters interact, what they characters tend to say, and how these patterns change over the run of the show**

![Apr-04-2024 19-19-53](https://github.com/SaumickPradhan/USA-UFO-Sightings-VIZ/assets/85262444/cc42723e-2cdb-4bfb-a6f0-bf79d8daa628)

<h2>Description</h2>

In our project, "UFO Sightings in United States: The Truth is out there" , we embarked on a journey to explore and visualize a comprehensive dataset compiled by the National UFO Reporting Center. This dataset, spanning over a century of reports from around the world, offers a unique window into the collective human experience with the unexplained aerial phenomena. We filtered the comprehensive dataset to provide us with information about UFO sightings in the United States, and used that to analyze the data and displayed it using a Leaflet map, along with 4 charts and a word cloud.

<h2>Video Presentation</h2>

https://youtu.be/_gbEaazZpM8

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
<summary><b>Following are the attributes used:</b></summary>

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
  <summary><b>Motivation of the Project</b></summary>

The motivation for this project was to contribute to the knowledge about the existance of Extraterrestrial activity
and contribute to the documentation and analysis of this cultural phenomenon, adding to the body of knowledge available for researchers, enthusiasts, and the curious alike. We also wanted to hone our data analysis skills in front-end frameworks like D3.Js and Leaflet.js along with using python to analyze and clean the dataset. This data also has first-hand encounters from real people via a reputable
website. 

</details>


<details><summary><b>Design Sketches</b></summary>



**UI sketches**

<img width="522" alt="image" src="https://github.com/SaumickPradhan/USA-UFO-Sightings-VIZ/assets/85262444/405d09b8-c849-4529-b206-96cdc4827c4b">

<img width="536" alt="image" src="https://github.com/SaumickPradhan/USA-UFO-Sightings-VIZ/assets/85262444/3c1c56f9-801b-4d81-af8f-bb257f180967">

<img width="520" alt="image" src="https://github.com/SaumickPradhan/USA-UFO-Sightings-VIZ/assets/85262444/cf7f3c98-ae6c-46ab-a7b8-464ff1830ca2">

<img width="532" alt="image" src="https://github.com/SaumickPradhan/USA-UFO-Sightings-VIZ/assets/85262444/56b6d40f-a53a-4d79-86fb-61c4b0ff827f">


**B Goals sketches**

<img width="894" alt="image" src="https://github.com/SaumickPradhan/USA-UFO-Sightings-VIZ/assets/85262444/61dcdac2-f43e-4d5e-a139-3a1d59fb032e">

**Word Cloud**

<img width="337" alt="image" src="https://github.com/SaumickPradhan/USA-UFO-Sightings-VIZ/assets/85262444/02bf269b-6351-4d76-b0d2-a4ed9edd8b20">

<img width="587" alt="image" src="https://github.com/SaumickPradhan/USA-UFO-Sightings-VIZ/assets/85262444/ea016774-bbfc-4b43-b6d5-b41ad44b4250">



**Sentiment Analysis**

<img width="428" alt="image" src="https://github.com/SaumickPradhan/USA-UFO-Sightings-VIZ/assets/85262444/797459a9-eed2-49ac-b57e-8a90f78110f9">




</details>

<details><summary><b>Design Specification</b></summary>

* Used a linear page scrollable format (changed our original grid based format) as we wanted a linear flow of selections instead of multiple views together. This facilitiates our story flow during our case studies and findings, mentioned later. 
* Have a story-like feel to the selcted/ brushed plots and result is tracked on the top
* Intutive tool tips with brushing on all
* More info about design specifications to follow

</details>

<h2>Visualization components</h2>

<details>
  <summary><b>1. Header with Data and Tools used</b> </summary>
  
  <b>Heading with Intro, Data source and Tools used with Links</b>

![image](https://github.com/SaumickPradhan/USA-UFO-Sightings-VIZ/assets/85262444/3efde11a-4d05-4f7a-aa00-3f6a416f085b)

</details>


<details>
  <summary><b>2. Reset Button</b> </summary>
  
  <b>Rest button to refresh the attributes and re align the page</b>
  

![image](https://github.com/SaumickPradhan/USA-UFO-Sightings-VIZ/assets/85262444/19194f13-6060-4ebb-8083-957541254925)

</details>


<details>
  <summary><b>3. Color Section </b> </summary>
  
For the color of dots on leaflet map:
  - year : Used A linear color scale to represent years, with darker shades indicating older years and lighter shades for younger years.
  - month : Used A sequential color scale to represent months, with different shades of green assigned to each month.
  - Time of Day : Used Fixed colors for each :-  Morning: Yellow, Afternoon: Orange, Evening: Red, Night: Blue. 
  - UFO shape: Used an ordinal color scale to represent different UFO shapes.

For the color of the buttons: 
 - used bright green for all four buttons to keep the theme of alternating green/blue colors all over the website.

For the colors present in Charts:
- Used a mix of blue/green, traditionally used to represent extrateresstrial life. 
- Each chart alternatives between blue and green.

Filtering By WordCloud: 
  - Used white to represent the changes in leaflet map, and indicate a clear change in selection. 


</details>


<details>
  <summary><b>4. Select Attributes</b> </summary>
  <b> (C Goals) Buttons and drop down to select the set of 'color by' options for points on map and switch background </b>

![image](https://github.com/SaumickPradhan/USA-UFO-Sightings-VIZ/assets/85262444/fc20d8e9-fcbc-49e6-a7da-54f35ad7f38a)

<b> Reasons: </b>

* Geo: How the geography (boundaries, rivers etc.) affects sightings
* Topo: How the Topography (ridges and valleys etc.) affect sightings
* Street: Is it more common to sight near cities or rural areas with less street?
* Airport: More sightings near the airport?

![image](https://github.com/SaumickPradhan/USA-UFO-Sightings-VIZ/assets/85262444/dbffdf7d-a1f7-4290-bbed-ab4ae1b8f6ad)


</details>


<details>
  <summary><b>5. Map</b> </summary>
  <b> (C Goals) Default zoom and positoning of USA, color encoding for plots, highlights and word cloud, Details on Demand </b>

![image](https://github.com/SaumickPradhan/USA-UFO-Sightings-VIZ/assets/85262444/17bca443-00e5-4db4-a101-103bc73aad42)

</details>



<details>
  <summary><b>6. Timeline</b> </summary>
  <b> (C Goals) Timeline by Year and number of sightings </b>

  <b> Reasons: </b>
  * Small binned bars to show height and spikes
  * Sorted by year
  * Using it to brush the map
  * Consulted professor on not having tool tip on timeline as we think it provides less utility. We deprecated the tool tip feature.

![image](https://github.com/SaumickPradhan/USA-UFO-Sightings-VIZ/assets/85262444/17bca443-00e5-4db4-a101-103bc73aad42)

</details>




<details>
  <summary><b>7. New Views</b> </summary>
 <details>
  <summary><b> (B Goals) Bar chart for sightings by Months, depicting seasons</b></summary>

  **Reason:** We did not have different colors for seasons as different places have different seasons. Wanted to depict clear frequency change hence decided to go with bar chart.

<img width="737" alt="image" src="https://github.com/SaumickPradhan/USA-UFO-Sightings-VIZ/assets/85262444/cdc689d2-f753-442b-8041-b349f4986fa1">

</details>

 <details>
  <summary><b> (B Goals) Histogram chart for frequency of sightings different times during the day</b></summary>

  **Reason:** Histogram helps with coninuous time intervals throughout the day. 24 hour timing used as it is universal.

<img width="1083" alt="image" src="https://github.com/SaumickPradhan/USA-UFO-Sightings-VIZ/assets/85262444/80c649ab-f2f5-4ce0-bb9f-6dec58bd80cf">

</details>

 <details>
  <summary><b> (B Goals) Histogram chart for frequency of sightings by encounter length</b></summary>

  **Reason:** Handled very short durations by clubbing them into custom sections (bars) of intervals

<img width="1167" alt="image" src="https://github.com/SaumickPradhan/USA-UFO-Sightings-VIZ/assets/85262444/6c3a665f-594f-4ee1-b055-2e34d5188cf8">

</details>

 <details>
  <summary><b> (B Goals) Emoji based scatter plot to track frequency of occurance of different shapes</b></summary>

  **Reason:** We wanted the user to see the different shapes represented in the plot to be intuitive.

<img width="1066" alt="image" src="https://github.com/SaumickPradhan/USA-UFO-Sightings-VIZ/assets/85262444/14d3a6e7-75ec-4a8c-8b59-41a6e03f2f87">

</details>

</details>

<details>
<summary><b>8. Details on Demand using Tool Tip</b></summary>
<b>Hovering over the Map and Word Cloud will provide extra information about that data point</b>
 
<img width="560" alt="image" src="https://github.com/SaumickPradhan/USA-UFO-Sightings-VIZ/assets/85262444/531bcd7e-f162-4947-8d22-147d6fd02170">

<img width="255" alt="image" src="https://github.com/SaumickPradhan/USA-UFO-Sightings-VIZ/assets/85262444/b2882914-3370-4ca0-b919-345b9fa4494d">

<img width="205" alt="image" src="https://github.com/SaumickPradhan/USA-UFO-Sightings-VIZ/assets/85262444/54ed41ba-4e25-47c9-8b82-dd1e77c2650a">

</details>

<details>
<summary><b>9. Sliding Brushing and Linking Map</b></summary>
<b> (A Goals) Brushing Map by Selecting and dragging a section on the Time line or any of the 4 Plots will lead to focusing the data on only a certain section on Map</b>

<img width="1078" alt="image" src="https://github.com/SaumickPradhan/USA-UFO-Sightings-VIZ/assets/85262444/9e2254d3-9458-448a-a5fb-7d0dab87ac4f">

<img width="705" alt="image" src="https://github.com/SaumickPradhan/USA-UFO-Sightings-VIZ/assets/85262444/4c6ec01f-7661-438d-93f7-c26526791b17">

<img width="1119" alt="image" src="https://github.com/SaumickPradhan/USA-UFO-Sightings-VIZ/assets/85262444/c8ef1fa3-89a1-46bc-a967-35db0f53c1c1">

<img width="1186" alt="image" src="https://github.com/SaumickPradhan/USA-UFO-Sightings-VIZ/assets/85262444/16577899-7ab8-4b76-ae03-c38cf68e7d57">

<img width="1075" alt="image" src="https://github.com/SaumickPradhan/USA-UFO-Sightings-VIZ/assets/85262444/332a850c-666c-4480-854b-7e7f721ee489">

**Reason:** 
* Becasue of the large dataset of shapes, it is slow to load the data. Hence brushing here is slow.
* Professor said it is not easy to use the default brush with D3 hence we came up with alternatives to brush by timeline

<img width="343" alt="image" src="https://github.com/SaumickPradhan/USA-UFO-Sightings-VIZ/assets/85262444/cbb43c47-9e5a-4e4d-b293-d91282b4cd19">

<b> (A Goals) Word Cloud to brush the Map</b>

**Reason:** 
* click on the words in the word cloud to see their spatial location and frequency in the map. the word cloud has tool tips and is colors by size. it brushes the map. 

<img width="1169" alt="image" src="https://github.com/SaumickPradhan/USA-UFO-Sightings-VIZ/assets/85262444/9ddaaee5-0e6b-4425-bc0b-f503eddd0f8d">

 
</details>
</details>



<h2>Interesting Findings from the Application</h2>

<details>
<summary><b>Recent Increase in Sightings</b></summary>
<b>It is interesting to note that the number of sightings have increased recently. Maybe due to increased airplanes, drones, people might assume them to be UFOs.</b>
<img width="638" alt="image" src="https://github.com/SaumickPradhan/USA-UFO-Sightings-VIZ/assets/85262444/a015a9f5-ccaf-4904-9710-a06509f9cd8b">
</details>

<details>
<summary><b>More sightings at night</b></summary>
  
<b>More sigthings seen at night, as shining objects, shooting stars and other entities are often confused with UFOs</b>
  
<img width="672" alt="image" src="https://github.com/SaumickPradhan/USA-UFO-Sightings-VIZ/assets/85262444/26df7397-c936-4e09-b975-1cf56d20b33c">
</details>

<details>
<summary><b>Common words are White and Light</b></summary>
<b>This shows that the sightings are commonly associated with sparkling flash lights (especially at night). Maybe stars.</b>
  
<img width="359" alt="image" src="https://github.com/SaumickPradhan/USA-UFO-Sightings-VIZ/assets/85262444/1b2d8336-10f9-44d6-ab75-329ed152ad4d">

</details>


<details>
<summary><b>More sigting near the airports</b></summary>
<b> Sightings are commonly seen near commericial airports. here is an example from California and Nevada. Look at SFO, SJO, LAX, LAS.</b>
  
<img width="594" alt="image" src="https://github.com/SaumickPradhan/USA-UFO-Sightings-VIZ/assets/85262444/48fd063e-4d6a-4772-ac4e-18aba8a49300">

<img width="601" alt="image" src="https://github.com/SaumickPradhan/USA-UFO-Sightings-VIZ/assets/85262444/f2d4b126-e2f6-4d4a-aeca-ef6b635b693d">

</details>

<details>
<summary><b>Population and terrain based data</b></summary>
<b> The more populated areas have more sigthings. The rough terrain areas have less sightings. <b>
 
<img width="601" alt="image" src="https://github.com/SaumickPradhan/USA-UFO-Sightings-VIZ/assets/85262444/f2d4b126-e2f6-4d4a-aeca-ef6b635b693d">

</details>




<h2>Application Architecture </h2>

<details>
<summary><b>Libraries Used</b></summary>
 
- [Javascript D3](https://d3js.org/)
 
- [Leaflet](https://leafletjs.com/)
  
- [WordCloud](https://github.com/jasondavies/d3-cloud)
</details>

<details>
<summary><b>Directory Structure</b></summary>
  
- CSS

  - style.css: ALl the styling for index.html
    
- data

  - ufo_sightings.csv: Origianl data for all the encounters, pulled from [National UFO Reporting Center](https://nuforc.org/).

  - ufo_sightings_NMV.csv: Preproccessed Data with encounters filtered for US only, with no missing values.
 
  - most_common_words: Preproccessed data with the 50 most commonly used word in descripttions.
 
  - word_coordinates1.csv: Preprocessed data with latitude and longitude attributed with the most common words.
    
- js
  
  - Leaflet.js: Leaflet file
    
  - d3.v6.min.js: D3 file

  - Leaflet.js-map: Leaflet map file

  - LeafletMap.js: Leaflet map file with Leaflet class for displaying the map and filtering with brushing along with tooltip functionality. 
    
  - main.js: Runner file for .js files along with loading all the csv datasets using D3
    
  - ufo_encounter.js: .js file for visualizing the frequency of sightings by encounter length by using D3.js, and implementing an interactive brush for filtering data.
    
  - ufo_seasonal_patterns.js: .js file for visualizing the frequency of sightings by month by using D3.js, and implementing an interactive brush for filtering data by month on a bar graph.

  - ufo_shaoe.js: .js file for visualizing the frequency of sightings by shape using custom shapes, and implementing an interactive brush for filtering data by shape on a bar chart.

  - ufo_sightings.js: .js file for visualizing the timeline of sightings over the years, and implementing an interactive brush for selecting date ranges.

  - ufoshapeplot.js: .js file for creating a bar chart visualization of UFO sightings categorized by shape and initializing the visualization with scales, axes, and brush functionality. 
    
- index.html: Runner page

- README.md



</details>



<details>
<summary><b>Future works</b></summary>
<b>1. </b> looking at a way to add different map where the regions can be selected

<b>2. </b> creating a uniform spaced maps with clickable bars

<b>3. </b> Improve styling and spacing in the page
  
</details>




 <details>
  <summary><b>Task Distribution</b></summary>

  <b> Here are the components worked on by the Team:</b>
  
  *  Introduction and Refresh: Saumick
  *  Color By buttons: Nachiket
  *  Leaflet Map and Re orientation: Saumick
  *  Map Tool Tips: Saumick
  *  Data preprocessing: Nachiket
  *  Change maps by attribute: Saumick
  *  Time Line + Brushing: Om
  *  Sightings by Month + Brushing: Om
  *  Sighting in a Day + Brushing: Om
  *  Sightings by Encounter Length + Brushing: Nachiket + Saumick
  *  Sightings by Shape + Brushing: Saumick
  *  Word Cloud + Tool tips: Nachiket
  *  Map Brushing: Nachiket
  *  CSS, coloring and formatting maps: Saumick
  *  Documentation: Saumick + Nachiket
  *  Some UI Sketches: Ameya
    
 </details>
