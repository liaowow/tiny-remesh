let allConvos = []
let allMessages = []
let allThoughts = []
let thoughtUniqID;

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
      renderAllConvos(allConvos)
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

function postThoughtFetch(newThoughtObj) {
  fetch(`${baseURL}/thoughts`, {
    method: "POST",
    headers: defaultHeaders,
    body: JSON.stringify(newThoughtObj)
  })
  .then(res => res.json())
  .then(newThought => {
    getAllContent()
  })
}

/***** DOM ELEMENTS *****/
// getElementById is more efficient
const sidebarDiv = document.querySelector("#sidebar-wrapper")
const mainPageWrapper = document.querySelector("#page-content-wrapper")
const mainPageDiv = document.querySelector(".container-fluid")
const modalContainer = document.querySelector(".modal-content")
const msgContainer = document.querySelector(".modal-body")
const cardColumn = document.querySelector("#exampleModalLong")

/***** EVENT LISTENERS *****/
sidebarDiv.addEventListener("click", handleSidebarClick)
mainPageDiv.addEventListener("click", handleConvoCard)

cardColumn.addEventListener("click", (event) => {
  if (event.target.id === "create-thought") {
    console.log("thoughtUniqID: ", thoughtUniqID)
    console.log("input dataset ID: ", document.getElementById("thought-input").dataset.msgid)
    const newThought = document.getElementById("thought-input").value
    const newThoughtObj = {
      text: newThought,
      message_id: document.getElementById("thought-input").dataset.msgid
    }
    postThoughtFetch(newThoughtObj)
    alert('New thought sent! 🎉')
  }
})

/***** EVENT HANDLERS *****/
// handles clicking a link in the sidebar
function handleSidebarClick(event) {
  switch(event.target.id) {
    case "all-convos":
      mainPageDiv.className = "center-form"
      getAllContent()
      break
    case "create-convo":
      mainPageDiv.className = "center-form"
      renderConvoForm()
      break
    case "search-convo":
      mainPageDiv.className = "center-form"
      renderSearchForm()
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
      alert('New message sent! 🎉')
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

/***** RENDER FUNCTIONS *****/
// render sidebar
function renderSidebar() {
  sidebarDiv.innerHTML = `
    <div class="sidebar-heading">
        <h1 class="logo-animation-happy"><strong>Tiny Remesh</strong>  <canvas width="30" height="30"></canvas></h1>
        <div id="clock-div"></div>
    </div>
    <div class="list-group list-group-flush">
        <a href="#" class="list-group-item list-group-item-action bg-light" id="all-convos">All Conversations</a>
        <a href="#" class="list-group-item list-group-item-action bg-light" id="create-convo">Create New Conversation</a>
        <a href="#" class="list-group-item list-group-item-action bg-light" id="search-convo">Search Conversation</a>
    </div>`
}

// render all convos
function renderAllConvos(convosArr) {
  mainPageDiv.innerHTML = `
    <br>
    <h1 style="text-align: center;">Your Conversations</h1>
    <br>
    <div id="uniq-cards" class="card-columns"></div>
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
      const clickedThoughts = allThoughts.filter(thought => thought.message_id === msg.id)
      thoughtUniqID = msg.id
      console.log("msg.id when mapping: ", msg.id)
      return `
        <h5>${msg.text}</h5>
        <p>⏰ Date and time sent: ${new Date(msg.updated_at).toLocaleString().split(",")}</p>
        <div class="thoughts-bg">
          <h6>Thoughts:</h6>
          ${renderThoughts(clickedThoughts)}
          <form id="thoughtcontent">
            <label for="title">Create New Thought:</label><br>
            <input id="thought-input" data-msgid="${msg.id}" name="text" type="text"></input><br><br>
            <button id="create-thought" type="button" class="btn btn-primary">Create New Thought</button><br><br>
          </form>
        </div>
        <hr>
      `
    }).join('')
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
    }).join('')
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

// render search form
function renderSearchForm() {
  mainPageWrapper.className = ""
  mainPageDiv.innerHTML = `
  <h1>Search Conversation</h1><br>
  <div class="search-form">
    <input class="search" type="text" placeholder="Search by title or keyword..." /><br>
    <button class="btn btn-secondary">Search</button><br><br>
  </div>
  <div class="card-columns"></div>
  `
  const searchInput = document.querySelector('.search')
  const searchBtn = document.querySelector('.btn-secondary')
  searchBtn.addEventListener('click', (e) => displayMatch(e, searchInput))
}

function displayMatch(e, searchInput) {
  const input = searchInput.value.toLowerCase()
  const matchedArr = allConvos.filter(convo => {
    return convo.title.toLowerCase().includes(input)
  })

  if (matchedArr.length) {
    return matchedArr.forEach(convo => renderOneConvo(convo))
  }
}

/***** INITIAL RENDERS *****/
renderSidebar()
getAllContent()