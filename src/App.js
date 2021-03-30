import {useState, useEffect} from 'react';
import Surprise from './Surprise';
import {Router, Route, Switch, BrowserRouter, Link} from 'react-router-dom';

const Home = () => {

  	return <h1>Home</h1>;
}

const NotFound = () => {

  	return <h1>Error 404 Not Found</h1>;
}

const Form = () => {

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [surprised, setSurprise] = useState(false);

  useEffect(() => {

  });

  const sendForm = (ev) => {

    ev.preventDefault();

    fetch('https://jsonplaceholder.typicode.com/posts', 
      {
      	method: 'POST',
      	body: JSON.stringify({
        	title: title,
        	body: body,
        	userId: 1
    		}),
    		headers: {"Content-Type": "Application/json; charset = UTF-8"}
    	}).then(response => response.json()).then(json => {
    			console.log(json);
    			setBody('');
    			setTitle('');
    	});

    	setSurprise(true);
  }

  return (
    <form onSubmit={(ev) => sendForm(ev)}>	
      <div>
        <label htmlFor="title">Título</label>
        <input type="text" id="title" value = {title} onChange = {(ev) => setTitle(ev.target.value)}/>
      </div>
      <div>
        <label htmlFor="body">Post</label>
        <textarea id="body" value = {body} onChange = {(ev) => setBody(ev.target.value)}></textarea>  
      </div>
      <div>
        <button type="submit">Enviar</button>
      </div>
      <div>
      	{surprised && <Surprise/>}	
      </div>
    </form>);
};

function App() {

  return (
  	<BrowserRouter>
    	<div>
    		<Form/>
    		<Link to="/home">Home</Link>
    		<Route path="/home" component = {Home}/>
      </div>
    </BrowserRouter>
  );
}

export default App;
