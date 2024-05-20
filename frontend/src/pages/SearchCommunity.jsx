// import React from 'react';
// import { useParams } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './styles/Home.css';
// import NavBar from './components/Navbar';
// import SideBar from './components/SideBar';
// import CommunityProfile from './components/CommunityProfile';

// const SearchCommunity = () => {
//   const { query } = useParams();

//   return (
//     <div className='h_body'>
//       <NavBar />
//       <div className='container-fluid ContentPage'>
//         <div className='row'>
//           <div className='col-lg-8 col-md-8'>
//             <div className='row'>
//               <h3 style={{ marginLeft: '4.5rem', marginBottom: '1rem' }}>Resultados de Comunidades para: {query}</h3>
//             </div>
//             <div className='row'>
//               <CommunityProfile query={query} />
//             </div>
//           </div>
//           <div className="col-lg-1 d-lg-block d-none">
//             {/* Espacio entre las columnas visible solo en pantallas LG o más grandes */}
//           </div>
//           <div className='col-lg-3 col-md-4 order-last'>
//             <SideBar />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SearchCommunity;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/Home.css';
import NavBar from './components/Navbar';
import SideBar from './components/SideBar';
import CommunityProfile from './components/CommunityProfile';

const SearchCommunity = () => {
  const { query } = useParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch(`http://localhost:3000/community/search/${query}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        const data = await response.json();
        if (data.success) {
          setResults(data.results);
        } else {
          setResults([]);
        }
      } catch (error) {
        setError('Error al llamar a la API');
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div className='h_body'>
      <NavBar />
      <div className='container-fluid ContentPage'>
        <div className='row'>
          <div className='col-lg-8 col-md-8'>
            <div className='row'>
              <h3 style={{ marginLeft: '4.5rem', marginBottom: '1rem' }}>
                Resultados de Comunidades para: {query}
              </h3>
            </div>
            <div className='row'>
              {loading ? (
                <p>Cargando...</p>
              ) : error ? (
                <p>{error}</p>
              ) : results.length > 0 ? (
                results.map((community) => (
                  <CommunityProfile key={community.id} community={community} />
                ))
              ) : (
                <p style={{ marginLeft: '4.5rem', marginBottom: '1rem' }}>No se encontraron comunidades.</p>
              )}
            </div>
          </div>
          <div className="col-lg-1 d-lg-block d-none">
            {/* Espacio entre las columnas visible solo en pantallas LG o más grandes */}
          </div>
          <div className='col-lg-3 col-md-4 order-last'>
            <SideBar />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchCommunity;

