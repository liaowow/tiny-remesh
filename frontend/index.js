let allConvos;
let allMessages;
let allThoughts;

/***** FETCHES *****/
const baseURL = "http://localhost:3000";
const defaultHeaders = {
    "Content-Type": "application/json",
    "Accepts": "application/json"
}

// READ actions
function getAllContent() {  
  fetch(`${baseURL}/convos`)
    .then(res => res.json())
    .then(convosArr => {
      allConvos = convosArr
      renderAllConvos(convosArr)
    })

  fetch(`${baseURL}/messages`)
  .then(res => res.json())
  .then(msgArr => {
    allMessages = msgArr
  })

  fetch(`${baseURL}/thoughts`)
  .then(res => res.json())
  .then(thoughtsArr => {
    allThoughts = thoughtsArr
  })
}

// CREATE actions
function postConvoFetch(newConvoObj) {
  fetch(`${baseURL}/convos`, {
      method: "POST",
      headers: defaultHeaders,
      body: JSON.stringify(newConvoObj)
  })
  .then(res => res.json())
  .then(newConvo => {
    getAllContent()
  })
}

function postMsgFetch(newMsgObj) {
  fetch(`${baseURL}/messages`, {
    method: "POST",
    headers: defaultHeaders,
    body: JSON.stringify(newMsgObj)
  })
  .then(res => res.json())
  .then(newMsg => {
    getAllContent()
  })
}

/***** DOM ELEMENTS *****/
const sidebarDiv = document.querySelector("#sidebar-wrapper")
const mainPageWrapper = document.querySelector("#page-content-wrapper")
const mainPageDiv = document.querySelector(".container-fluid")
const modalContainer = document.querySelector(".modal-content")
const msgContainer = document.querySelector(".modal-body")

/***** EVENT LISTENERS *****/
sidebarDiv.addEventListener("click", handleSidebarClick)
mainPageDiv.addEventListener("click", handleConvoCard)

/***** EVENT HANDLERS *****/
// handles clicking a link in the sidebar
function handleSidebarClick(event) {
  switch(event.target.id) {
    case "all-convos":
      mainPageDiv.className = ""
      getAllContent()
      break
    case "create-convo":
      mainPageDiv.className = "center-form"
      renderConvoForm()
      break
  }
}

function handleConvoCard(event) {
  if (event.target.id === "view-entry-btn") {
    let clickedConvoCard = event.target.closest("div")
    let clickedConvoID = parseInt(clickedConvoCard.id)
    let clickedConvo = allConvos.find(convo => convo.id === clickedConvoID)
    let clickedMsg = allMessages.filter(msg => msg.convo_id === clickedConvoID)

    modalContainer.innerHTML = `
    <div class="modal-header">
    <h5 class="modal-title" id="exampleModalLongTitle">${clickedConvo.title}</h5>
    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
    </button>
    </div>
    <div class="modal-body">
      ${renderMessages(clickedMsg)}
      <form id="create-msg-form">
        <label for="title">Create New Message:</label><br>
        <textarea name="text" rows="4" cols="50"></textarea><br><br>
        <input type="submit" class="btn btn-primary" value="Submit Message"><br><br>
      </form>
    </div>
    <div class="modal-footer">
        <div id="${clickedConvo.id}" style="display: none;"></div>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
    </div>
    `

    const createMsgForm = document.querySelector("#create-msg-form")
    createMsgForm.addEventListener("submit", (event) => {
      event.preventDefault()
      let newMsg = event.target["text"].value
    
      const newMsgObj = {
          text: newMsg,
          convo_id: clickedConvoID
      }
      postMsgFetch(newMsgObj)
      createMsgForm.reset()
    })
  }
}

function handleCreateConvo(event) {
  event.preventDefault()
  let newTitle = event.target["title"].value
  const newConvoObj = {
      title: newTitle
  }
  postConvoFetch(newConvoObj)
}


function handleCreateThought(e, msgID) {
  e.preventDefault()
  console.log('over here!!!!!')
}

/***** RENDER FUNCTIONS *****/
// renders sidebar
function renderSidebar() {
  sidebarDiv.innerHTML = `
    <div class="sidebar-heading">
        <h1 class="logo-animation-happy"><strong>Tiny Remesh</strong>  <canvas width="30" height="30"></canvas></h1>
        <div id="clock-div"></div>
    </div>
    <div class="list-group list-group-flush">
        <a href="#" class="list-group-item list-group-item-action bg-light" id="all-convos">All Conversations</a>
        <a href="#" class="list-group-item list-group-item-action bg-light" id="create-convo">Create New Conversation</a>
    </div>`
}

// render all convos
function renderAllConvos(convosArr) {
  mainPageDiv.innerHTML = `
  <br>
  <h1 style="text-align: center;">Your Conversations</h1>
  <div class="search">
    <input class="searchterm" type="text" placeholder="Search by title..." />
  </div>
  <br>
  <div class="card-columns"></div>
  `
  convosArr.forEach(convo => renderOneConvo(convo))
}

// render one convo
function renderOneConvo(convo) {
  const convoCard = document.createElement("div")
  const newDateFormat = new Date(convo.created_at).toLocaleString().split(",")[0]
  convoCard.className = "card"
  convoCard.style = "width: 18rem;"
  convoCard.innerHTML = `
  <div class="card-body" id=${convo.id}>
    <h3>Title:</h3>  
    <h4 class="card-title">${convo.title}</h4>
    <h3>Start Date:</h3>  
    <h6 class="card-title">${newDateFormat}</h6>
      <!-- Button trigger modal -->
      <button type="button" id="view-entry-btn" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalLong">
      View Messages and Thoughts
      </button>
  </div>
  `

  const cardColumns = document.querySelector(".card-columns")
  cardColumns.append(convoCard)
}

// render messages
function renderMessages(msgArr) {
  if (!msgArr.length) {
    return `
    <h5 style="text-align: center;">This conversation does not have messages yet.</h5>
    `
  } else {
    return msgArr.map(msg => {
      console.log(msg)
      const clickedThoughts = allThoughts.filter(thought => thought.message_id === msg.id)
      const msgID = msg.id

      return `
        <h5>${msg.text}</h5>
        <p>⏰ Date and time sent: ${new Date(msg.updated_at).toLocaleString().split(",")}</p>
        <div style="background-color: #D3D3D3; border-radius: 10px; padding: 10px;">
          <h6>Thoughts:</h6>
          ${renderThoughts(clickedThoughts)}
          <form id="create-thought-form">
            <label for="title">Create New Thought:</label><br>
            <textarea name="text" rows="4" cols="50"></textarea><br><br>
            <input type="submit" class="btn btn-primary" value="Submit Thought"><br><br>
          </form>
        </div>
        <hr>
      `

      const createThoughtForm = document.querySelector('#create-thought-form')
    })
  }
}

// render thoughts
function renderThoughts(thoughtsArr) {
  if (!thoughtsArr.length) {
    return ""
  } else {
    return thoughtsArr.map(thought => {
      return `
        <li>${thought.text}</li>
        <p>💡 Date and time sent: ${new Date(thought.updated_at).toLocaleString().split(",")}</p>
      `
    })
  }
}

// render convo form
function renderConvoForm() {
  mainPageWrapper.className = ""
  mainPageDiv.innerHTML = `
  <h1>Create a New Conversation</h1><br>
  <form id="create-convo-form">
      <label for="title">Give your conversation a title:</label><br>
      <input type="text" name="title"><br><br>
      <input type="submit" class="btn btn-primary" value="Submit Conversation"><br><br>
  </form>
  `
  const createConvoForm = document.querySelector("#create-convo-form")
  createConvoForm.addEventListener("submit", handleCreateConvo)
}

/***** INITIAL RENDERS *****/
renderSidebar()
getAllContent()