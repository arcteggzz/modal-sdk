class CatsDogsSDK extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    // simple internal state
    this.state = {
      screen: "welcome", // welcome | dashboard
      sidebar: "home", // home | test | upgrade
      selectedBreed: null,
    };

    this.render();
  }

  // ----------------------- RENDER -----------------------
  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.4);
          display: flex;
          justify-content: center;
          align-items: center;
          font-family: sans-serif;
          z-index: 999999;
        }
        .modal {
          width: 700px;
          height: 450px;
          background: white;
          border-radius: 10px;
          display: flex;
          flex-direction: column;
          padding: 0;
          overflow: hidden;
        }
        
        .header {
          padding: 15px;
          border-bottom: 1px solid #eee;
          font-size: 18px;
          font-weight: bold;
        }

        .body {
          flex: 1;
          display: flex;
        }

        /* Sidebar */
        .sidebar {
          width: 30%;
          border-right: 1px solid #eee;
          padding: 10px;
        }

        .sidebar-item {
          padding: 10px;
          cursor: pointer;
          border-radius: 6px;
        }
        .sidebar-item.active {
          background: #000;
          color: white;
        }

        /* Content area */
        .content {
          width: 70%;
          padding: 20px;
        }

        .button {
          padding: 10px 15px;
          background: black;
          color: white;
          border-radius: 6px;
          cursor: pointer;
          border: none;
          margin-top: 20px;
        }

        .breed {
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 6px;
          margin-bottom: 10px;
          cursor: pointer;
        }
        .breed.selected {
          background: #000;
          color: white;
        }
      </style>

      <div class="backdrop">
        <div class="modal">
          ${this.renderHeader()}
          ${this.renderBody()}
        </div>
      </div>
    `;

    this.attachEvents();
  }

  // ----------------------- HEADER -----------------------
  renderHeader() {
    if (this.state.screen === "welcome") {
      return `<div class="header">Welcome to Cats and Dogs</div>`;
    }
    return `<div class="header">Cats & Dogs SDK</div>`;
  }

  // ----------------------- BODY -------------------------
  renderBody() {
    if (this.state.screen === "welcome") {
      return `
        <div class="content" style="width:100%; text-align:center; padding-top:50px;">
          <p>Welcome to Cats and Dogs!</p>
          <button class="button" id="startBtn">Start</button>
        </div>
      `;
    }

    // dashboard layout
    return `
      <div class="body">
        ${this.renderSidebar()}
        ${this.renderContent()}
      </div>
    `;
  }

  // ----------------------- SIDEBAR -----------------------
  renderSidebar() {
    return `
      <div class="sidebar">
        ${this.sidebarItem("home", "Home")}
        ${this.sidebarItem("test", "Test")}
        ${this.sidebarItem("upgrade", "Upgrade")}
      </div>
    `;
  }

  sidebarItem(key, label) {
    const active = this.state.sidebar === key ? "active" : "";
    return `<div class="sidebar-item ${active}" data-sidebar="${key}">${label}</div>`;
  }

  // ----------------------- CONTENT AREA -----------------------
  renderContent() {
    switch (this.state.sidebar) {
      case "home":
        return this.renderHome();
      case "test":
        return this.renderTest();
      case "upgrade":
        return this.renderUpgrade();
    }
  }

  // HOME SCREEN
  renderHome() {
    const breeds = ["Persian Cat", "German Shepherd"];
    return `
      <div class="content">
        <h3>Select a Breed</h3>
        ${breeds
          .map(
            (b) => `
          <div class="breed ${
            this.state.selectedBreed === b ? "selected" : ""
          }" data-breed="${b}">
            ${b}
          </div>
        `
          )
          .join("")}

        <button class="button" id="continueBtn">Continue</button>
      </div>
    `;
  }

  // TEST SCREEN
  renderTest() {
    return `
      <div class="content">
        <h3>Test For: ${this.state.selectedBreed || "(none selected)"}</h3>
        <p>1. Is this breed friendly?</p>
        <p>2. What is the average lifespan?</p>
      </div>
    `;
  }

  // UPGRADE SCREEN
  renderUpgrade() {
    return `
      <div class="content">
        <h3>Upgrade</h3>
        <p>Unlock premium dog & cat insights.</p>
      </div>
    `;
  }

  // ----------------------- EVENTS -----------------------
  attachEvents() {
    // start button
    const startBtn = this.shadowRoot.querySelector("#startBtn");
    if (startBtn) {
      startBtn.onclick = () => {
        this.state.screen = "dashboard";
        this.render();
      };
    }

    // sidebar clicks
    this.shadowRoot.querySelectorAll("[data-sidebar]").forEach((el) => {
      el.onclick = () => {
        this.state.sidebar = el.dataset.sidebar;

        // force test screen only if breed selected
        if (this.state.sidebar === "test" && !this.state.selectedBreed) {
          alert("Select a breed first (from Home)");
          return;
        }

        this.render();
      };
    });

    // breed selection
    this.shadowRoot.querySelectorAll("[data-breed]").forEach((el) => {
      el.onclick = () => {
        this.state.selectedBreed = el.dataset.breed;
        this.render();
      };
    });

    // continue button
    const continueBtn = this.shadowRoot.querySelector("#continueBtn");
    if (continueBtn) {
      continueBtn.onclick = () => {
        if (!this.state.selectedBreed) {
          alert("Please select a breed.");
          return;
        }
        this.state.sidebar = "test";
        this.render();
      };
    }
  }
}

// register component
customElements.define("catsdogs-sdk", CatsDogsSDK);

// simple global API
window.CatsDogsSDK = {
  open() {
    document.body.appendChild(document.createElement("catsdogs-sdk"));
  },
};
