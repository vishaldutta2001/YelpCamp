# YelpCamp
<h2>It is an YelpCamp Prototype Project where we can view all the listed campgrounds and we can also add new Campgrounds.</h2>

<h3>Key Points</h3>
<ul>
  <li>Users can create, edit, and remove campgrounds</li>
  <li>Users can review campgrounds once, and edit or remove their review</li>
  <li>Search campground by their location in map</li>
</ul>
<h3> Features </h3>
<ol>
<li>Authentication</li>
<p>Only logged user can view all the campgrounds but cannot add new campgrounds. To add new campground, user have to logged-in first and than add new campgrounds.<br>
Campground Schema includes Title, Location, Price, Images and Description.<br> I have added both the client side and server side validations. For client-side validation, I have used bootstrap class (class="validated-form" and its related script) and for backend validation, I have used JOI package where I predefined the JOI schema and compare that JOI schema with my campground Schema. I have also add the review features in every campground where user can add reviews and star rating and Only the logged user can add the reviews.
</p>
<li>Authorization</li>
<p>Only the authorized User can delete and edit their existed campgrounds. Also Authorized User can delete their created reviews (Owner of the campground is referred as authorized User of that campground) </p>
<li>Fancy Cluster Map</li>
<p>I have added the a cluster map using mapbox package. I have added a cluster map with a marker on it and attached Zoom-in Zoom-out tool</p>
</ol>

<h4>Different Routes</h4>
<ol>
  <li>Home Page</li>
![HomePage](https://user-images.githubusercontent.com/71959396/232110447-bddb30a6-ef96-4494-bd5e-71fa34363e35.png)
  
<li>All Campgrounds</li>
  ![IndexPage](https://user-images.githubusercontent.com/71959396/232112670-e3aa789e-6d3d-40c6-ae48-de7eda311f6f.png)
  
  <li>Show Page</li>
  ![ShowPage](https://user-images.githubusercontent.com/71959396/232115185-e6f7516f-a777-437f-aaa7-b0746010d985.png)

  <li>Login Page</li>
  ![LoginPage](https://user-images.githubusercontent.com/71959396/232114898-929afa93-b2ae-4882-8806-8cd5861da76c.png)
 
  <li>Register Page</li>
  ![RegisterPage](https://user-images.githubusercontent.com/71959396/232114963-c21ace1f-04b6-441d-9c55-57edf579db86.png)

  <li>New Campground</li>
  ![NewCampground](https://user-images.githubusercontent.com/71959396/232115048-9bf5ff2d-47a1-454e-afbb-7f3cf347a159.png)
  
  <li>Edit Campground</li>
![EditCampground](https://user-images.githubusercontent.com/71959396/232115094-e6c5d3a3-050a-446b-8e4e-46e96080b24b.png)
  
</ol>


<h4>Technology And Framework Used</h4>
<ul>
  <li>Html</li>
  <li>CSS</li>
  <li>Bootstrap</li>
  <li>JavaScript</li>
  <li>Node.js</li>
  <li>Express.js</li>
  <li>Mongoose</li>
  <li>MongoDB</li>
</ul>

<h4>Some of the Packages Used</h4>
<ol>
<li>ejs</li>
ejs package is used for creating different templates representing each page mentioned above.
<li>joi</li>
Joi package is used for backend Validation 
<li>cloudinary, multer and multer-storage-cloudinary</li>
Above three packages are used for uploading images to our cloudinary environment and saving URL and filename to our mongoDB 
<li>helmet</li>
For handling some common Security Issues and we write a function where we define from which resources(dependencies) we can retrieve the data and use it in our YelpCamp project.
<li>connect-flash</li>
for creating and showing flash messages on our YelpCamp.
<li>@mapbox/mapbox-sdk</li>
For deploying the cluster map in our index and homepage
<li>passport, passport-local, passport-local-mongoose</li>
Above three Packages are used for adding authentication in our project.
</ol>



