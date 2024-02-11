# FrameOff
![image](https://github.com/keviinliuu/FrameOff/assets/68870628/1323dacb-b11e-45b9-a7d2-44093c47991f)

## What is FrameOff?

FrameOff is a light-weight image-based polling service that allows users to create, share, and vote on polls instantly! No form of sign up is required at all, making it convenient and quick for anybody to generate a poll and share it to the world.

Currently, FrameOff supports only one mode of voting - what we call a duel! Essentially, a user can upload two images that go "head on" together in a single duel, and voters will choose which image of the two they prefer more. A poll can consist of several of these "duels," with a different pair of photos for each "slide." The results are instantaneously available - right after voting, the voting statistics for both images are displayed so you can see which one is in the lead! 

Creation is straightforward - after giving your poll a title and an optional description, you can go straight to uploading photos and creating as many slides as you want. Once you've finished creating your wonderful poll, a short link is generated which you can send to everybody you know. Voting is just as simple - click on the image you like better on each slide! As mentioned, results are displayed once you have casted your vote.

The idea of FrameOff first came when one of our friends, who is a photographer, asked us to create a service that would allow him to compete against his mother, who was also a photographer. His family had recently taken a trip somewhere, and wanted people to judge on who took the better photos between him and his mom. Using this as our base idea, we started to make something that would be useful and easy to use. Sure, there are many polling services already out there that support images, but the idea behind ours is that it's quick and features a better UI. How many of these services ask you to sign up to make your polls, or are super clunky and hard to look at? FrameOff aims to create a clean, seamless experience that simplifies image polling and makes it easy for users to pick up and use.

## Examples

### Creation

![image](https://github.com/keviinliuu/FrameOff/assets/68870628/cc58c27e-764c-420b-8fc4-7760c5fd883a)

### Voting

![image](https://github.com/keviinliuu/FrameOff/assets/68870628/dc5affa5-093f-4684-bd4c-cea664e9778b)

![image](https://github.com/keviinliuu/FrameOff/assets/68870628/cb2092f4-a4f9-4b58-86af-e7d3661003c9)

![image](https://github.com/keviinliuu/FrameOff/assets/68870628/4c56b4e2-cb70-4ed5-9a55-6e8a99dc706a)

### Sharing

![image](https://github.com/keviinliuu/FrameOff/assets/68870628/7a5717f9-0ddc-4e96-a973-bf89c7a327f2)

## How Did We Build It?

FrameOff is created using a variety of technologies. Its backend is implemented using Node.js and Express in TypeScript. FrameOff is connected to a MongoDB (NoSQL) database, and utilizes Amazon Web Services (AWS) S3 to store and retrieve images. The backend features multiple API endpoints that supports poll creation, voting, and retrieving results. 

The user interface is built using TypeScript, React.js, Tailwind CSS, and anime.js for animations. To test out our webpages, we used Storybook when prototyping their looks. Additionally, we used Zustand for cleaner and more maintainable state management in order to enhance data manipulation efficiency.

## Challenges We Ran Into

The first major challenge came when we were deciding how exactly to store images. There were two main options - storing image buffer data as a base64 string or creating a reference URL with a separate storage service. Since we were learning about databases in general at the time, we weren't too sure which way to go. Ultimately, we learned that creating reference URLs and storing the image in a separate storage was the ideal way. Databases aren't for storing large amounts of data such as an encoded base64 string - rather, they're more for organizing data. Thus, we decided to move forward using AWS S3, which allows us to easily store images inside a bucket, generate a URL, assign these URLs to our data objects in MongoDB, and retrieve them when needed.

Our next challenge was actually another database decision. Due to the nature of our data objects, we spent a great amount of effort into researching whether we use embedded or referenced documents in regards to storing nested objects. Of course, it mattered how exactly we would be manipulating our data objects, and how often. Obviously, we wanted to select the option that would optimize performance and scalability. After a while of researching and debating, we settled on using referenced documents when storing individual "slides" in a given poll. We opted for this decision given how we wanted to implement our voting mechanism - since each slide updates right after voting, it would be more ideal to update that one individual slide in the database rather than having to update the whole poll everytime a vote is cast for each slide. On the other hand, poll creation would be simpler if we had chosen the embedded structure, but since the action of voting on a poll is more numerous than the action of creating a poll (creating a poll happens once, but you vote multiple times for the multiple slides on that poll!), it seemed that referenced documents would be the better way to go.

Next, came the greatest challenge of all - designing our website. To be truthful, none of us are really good at graphic design. We're software developers, not graphic designers! But still, we tried our best. We really wanted to focus in and create a simplistic, yet unique design for our website since it's what would differentiate us from other poll websites out there. A good UI/UX experience can make or break a webapp, and we wanted to make sure we had a design that invited people to use our service through simplistic and good-looking features. As a result, we spent a lot of time creating mock-ups in Figma, discussing and debating over our designs, starting over again, and on and on until we finally settled on something we all liked. Even small things, like colours or spacings - these miniscule details would still generate a lot of discussion. Needless to say, we wanted to make our design near perfect (but it seems no such things exists...) that would make us stand out. We hope we've accomplished this goal.

Finally, bringing our designs to life with the help of React! But a word to the wise, it is harder than it seems. This is especially true when making your website responsive and able to display properly on multiple screen sizes. We intiially ran into many challenges with spacing of our components around the page - things would be off and when you tried to adjust something, the entire page would break. Initially, we naively created components and placed them wherever we wanted on a page, but soon found out that wouldn't take us very far. It's important to plan out these pages beforehand - what divs should go where, how we determine position of certain components, and creating breakpoints so that our page would resize appropriately. Creating a UI definitely isn't an easy feat, but we've managed to power through these challenges and come out the other side.

## Accomplishments We're Proud Of

FrameOff is a project that we are all massively proud of. When working on the backend, we were proud of our effective AWS S3 integration for our image storage. Additionally, we were pleased with how we designed our database in the end to optimize performance as well as maintainability and scalability. For the front-end, we were extremely proud of our clean, simplistic user interfaces. Despite it being a challenge, we were able to bring our ideas to reality and create a product we think looks good. Further, we are proud of our usage of zustand to simplify and optimize our state management. 

## What's Next?

FrameOff, at the moment, is still in development. However, we are close to completing our very first version! We aim to launch FrameOff before the end of the 2023 and start to gain users as soon as possible. After it goes live, we want to take in user feedback and fix any bugs or improve any features that are necessary. In the future, we're also planning on adding new features, such as new voting modes including King of the Hill (the image you vote for stays, the other is replaced by the next photo until one photo wins), additional functional and visual customizability to polls, improved infrastructure to support project scalability, and more! We hope that FrameOff can take off and become THE image poll platform that everybody goes to use.


