import { useState } from 'react';
import '../Style/search.css';

const Search = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = () => {
        if (!searchTerm.trim()) {
            setSearchResults([]);
            return;
        }

        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const results = users.filter(user => 
            user.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(results);
    };

    return (
        <div className="search-page">
            <h1>Search Users</h1>
            <div className="search-field">
                <input 
                    type="text" 
                    className="search-input" 
                    placeholder="Enter username" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button onClick={handleSearch} className="search-btn">Search</button>
            </div>
            
            <div className="search-results">
                {searchResults.length > 0 ? (
                    searchResults.map(user => (
                        <div key={user.id} className="user-card">
                            <h3>{user.name}</h3>
                            <p><strong>Email:</strong> {user.email}</p>
                            {user.place && <p><strong>Place:</strong> {user.place}</p>}
                            {user.about && <p><strong>About:</strong> {user.about}</p>}
                        </div>
                    ))
                ) : searchTerm && (
                    <p className="no-results">No users found</p>
                )}
            </div>
        </div>
    );
};

export default Search;