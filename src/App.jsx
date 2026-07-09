import { useState } from "react";

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 11.5 12 4l9 7.5" />
      <path d="M5 10.5V20h5v-5h4v5h5v-9.5" />
    </svg>
  );
}

function LoginIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
      <path d="M10 17l5-5-5-5" />
      <path d="M15 12H3" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 21a8 8 0 0 0-16 0" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function DashboardIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
    </svg>
  );
}

function App() {
  const [name, setName] = useState("");
  const [signedInName, setSignedInName] = useState("");
  const [message, setMessage] = useState("");
  const [isSignedIn, setIsSignedIn] = useState(false);

  const handleSignIn = () => {
    const trimmedName = name.trim();

    if (!trimmedName) {
      setIsSignedIn(false);
      setMessage("Please enter your name");
      return;
    }

    setIsSignedIn(true);
    setSignedInName(trimmedName);
    setMessage(`Welcome, ${trimmedName}!`);
  };

  const handleLogout = () => {
    setIsSignedIn(false);
    setSignedInName("");
    setMessage("");
  };

  return (
    <>
      <header className={isSignedIn ? "navbar signedIn" : "navbar"}>
        <div className="leftHeader">
          <a className="brand" href="#home" aria-label="Auth Demo home">
            <HomeIcon />
            <span>{isSignedIn ? "AuthDemo" : "Auth Demo"}</span>
          </a>

          <nav className="navLinks" aria-label="Main navigation">
            <a href="#home">
              <HomeIcon />
              <span>Home</span>
            </a>

            {isSignedIn ? (
              <a href="#dashboard">
                <DashboardIcon />
                <span>Dashboard</span>
              </a>
            ) : (
              <a href="#login">
                <LoginIcon />
                <span>Login</span>
              </a>
            )}
          </nav>
        </div>

        {isSignedIn && (
          <div className="userMenu" aria-label="Signed in user">
            <span className="userName">
              <UserIcon />
              {signedInName}
            </span>
            <button className="logoutButton" type="button" onClick={handleLogout}>
              <LoginIcon />
              <span>Logout</span>
            </button>
          </div>
        )}
      </header>

      <main className="pageShell" id="login">
        <section className="authCard" aria-labelledby="login-title">
          <h1 id="login-title">Welcome Back</h1>

          <label className="inputBox" htmlFor="username">
            <UserIcon />
            <input
              id="username"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleSignIn();
                }
              }}
            />
          </label>

          <button type="button" onClick={handleSignIn}>
            <LoginIcon />
            <span>Sign In</span>
          </button>

          {message && (
            <p className={isSignedIn ? "message success" : "message error"}>
              {message}
            </p>
          )}
        </section>
      </main>
    </>
  );
}

export default App;
