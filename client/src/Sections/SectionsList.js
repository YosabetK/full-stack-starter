import {useEffect, useState} from 'react';
import Api from '../Api';

function SectionsList(){
    const [sections, setSections] = useState([]);
    useEffect(function(){
      Api.sections.index().then(response => setSections(response.data));  
    }, []);
    return(
        <main className="continer">
            <h1>SectionsList</h1>
            <ul>
              {sections.map(s =>(
                  <li>{s.name}</li>
              ))}
            </ul>
        </main>
    );

}
export default SectionsList;