# Tiny Remesh

## Overview
Welcome to Tiny Remesh -- an experimental, mini version of [Remesh.ai](https://remesh.ai/). It is a single-page application built with **vanilla JavaScript** on the front end and **Ruby on Rails** on the back end.

This project features two main user actions:
- READ
  - A user can see a list of conversations
  - A user can click on a conversation and view that conversation's messages and all the thoughts for each message
  - A user can view the thoughts for each message in a conversation
  - A user can search for conversations by title
- CREATE
  - A user can create conversations
  - A user can create messages for a conversation
  - A user can create thoughts for a message


## Instructions
To get the application up and running locally on your computer, please follow the steps below:

1. **Fork repository**
  - You will need to make a clone of this repo and open the project in your favorite code editor.

2. **Install project dependencies**
  - This project's database is served via Ruby on Rails. If you don't have Ruby Gems in your local environment, please follow the [official guide](https://guides.rubygems.org/rubygems-basics/#installing-gems) and install accordingly.
  - Once you have Ruby Gems installed, make sure you also have Rails Gem installed. Rails is simply a Ruby Gem. To install it on your system, run the following command in the terminal of your computer:
  ```
  $ gem install rails
  ```  
  - Awesome! Now, navigate to the `backend` directory of this project, and run the following command. This will install the dependencies specified in the Gemfile.
  ```
  $ bundle install
  ```

3. **Set up seed data**
  - There are some dummy data already set up in `db/seed.rb` file. Run the following command to populate those dummy data in the database. 
  ```
  $ rails db:seed
  ```

4. **Start Rails server**
  - To start up the Rails server, make sure you are in the root of the application, i.e. `backend` directory, in the terminal and run:
  ```
  $ rails s
  ```
  - Now that the server is running properly, you can check out the seed data output by navigating to these three links:
    - `http://localhost:3000/convos`
    - `http://localhost:3000/messages`
    - `http://localhost:3000/thoughts`

5. **Load the page**
  - With the Rails server still running, open another command prompt window and navigate to the `frontend` directory of this project. Run the following command:
  ```
  $ open index.html
  ```
  - And voilà! You have arrived at Tiny Remesh 😎