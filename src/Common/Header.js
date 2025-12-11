import { NavLink} from 'react-router-dom';
const Header = ()=>{
    return(
        <header className='header'>
        <img src="./image/logo192.png" alt='Black' ></img>
        <div className='links'>
          <NavLink to={"/"}>Home</NavLink>
          <NavLink to={"/about"}>About</NavLink>
          <NavLink to={"/search"}>Search</NavLink>
          <NavLink to={"/chatting"}>Chatting</NavLink>
          <NavLink to={"/login"}>Login</NavLink>
          
        </div>
      </header>
    );
};

export default Header;