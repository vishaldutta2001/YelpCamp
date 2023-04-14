# YelpCamp
<h4>It is an YelpCamp Prototype Project where we can view all the listed campgrounds and we can also add new Campgrounds.</h4>

<h5> Features </h5>
<ol>
<li>Authentication</li>
<p>only logged user can view all the campgrounds but cannot add new campgrounds. To add new campground user have to logged in first and than addd new campgrounds<br>
Campground Schema includes Title, Location, Price, Images and description. I have added both the client side and server side validations. for client-side validation, i have used bootstrap class (class="validated-form" and its related script) and for backend validation i have used JOI package where I predefined the JOI schema and compare that JOI schema with my campground Schema. I have also add the review features in every campground where user can add reviews and star rating and Only the logged user can add the reviews.
</p>
<li>Authorization</li>
<p>Only the authorized User can delete and edit their existed campgrounds. Also Authorized User can delete their created reviews (Owner of the campground is referred as authorized User of that campground) </p>
<li>Fancy Cluster Map</li>
<p>I have added the a cluster map using mapbox package. I have added a cluster map with a marker on it and attached Zoom-in Zoom-out tool</p>
</ol>


It is an YelpCamp Project where we can view various pages related to login, register, homepage, all campground details and viewing single campground show page 
and i have authentication and authorization concept over it so that a authenticated user can add a new review and authorized user (creater of that review) can delete 
it if it deemed to
and authorized person can delete and edit the campground according to its needs.
to add a new campground, firstly user have to be logged in and after that it can add a new campground
i have also applied JOI package validation over the campground details
A single campground includes campground name, location, price, images, and description.
to create a new campground User have to write name,location price and description carefully.

