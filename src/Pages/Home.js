import { useOutletContext, Link } from "react-router-dom";
import "../Style/home.css";

const Home = () => {
    const outlet = useOutletContext();
    const data = outlet?.data || [];

    return (
        <div className="home">
            <header className="homepage">
                <div className="content">
                    <h1>Ro-Ro Chat</h1>
                    <p className="tagline">Connect instantly. Chat freely. Build communities.</p>
                    <div className="hero-actions">
                        <Link to="/chatting" className="btn primary">Start Chatting</Link>
                        <Link to="/login" className="btn">Login</Link>
                    </div>
                </div>
                <img src="/image/logo192.png" alt="chat hero" className="hero-image" />
            </header>

            <section className="features">
                <div className="card">
                    <img src="https://images.unsplash.com/photo-1545239351-1141bd82e8a6?w=800&q=60&auto=format&fit=crop" alt="messages" />
                    <h3>Instant Messaging</h3>
                    <p>Fast, reliable messaging with real-time updates.</p>
                </div>
                <div className="card">
                    <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=60&auto=format&fit=crop" alt="group chat" />
                    <h3>Group Chats</h3>
                    <p>Create rooms for friends, colleagues, or communities.</p>
                </div>
                <div className="card">
                    <img src="https://images.unsplash.com/photo-1504805572947-34fad45aed93?w=800&q=60&auto=format&fit=crop" alt="security" />
                    <h3>Secure</h3>
                    <p>Your conversations are private and protected.</p>
                </div>
            </section>

            <footer className="home-footer">
                <p>Built for chat lovers.</p>
            </footer>
        </div>
    );
};

export default Home;