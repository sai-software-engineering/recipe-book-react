import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <div className="hero-card">
        <h1>Full-stack recipe and nutrition management engine.</h1>
        <p>
          Powered by a robust Spring Boot microservice backend and a reactive modern interface,
          ChefScale delivers relational ingredient mapping, calorie tracking, and dynamic portion
          scaling.
        </p>
      </div>

      <div className="features-section">
        <h2>What you can do:</h2>
        <ul>
          <li>
            Browse existing recipes with detailed per-ingredient quantities and
            step-by-step instructions.
          </li>
          <li>
            Add custom multi-ingredient recipes with dynamic row manipulation and
            database persistence.
          </li>
          <li>
            Keep nutrition metrics consistent across master food registries.
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Home;