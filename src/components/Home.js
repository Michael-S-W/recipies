import React from 'react'
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const Home = () => {
  
  const [countries, setCountries] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')

        if(!response.ok){
          throw new Error(`Status Error: ${response.status} `);
        }

        const result = await response.json()
        setCountries(result.meals)

      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, []);

  if(loading) return <h1>LOADING...</h1>
  if(error) return <div>Error: {error}</div>;

  return (
    <>
      <h1 className='text-center my-5'>World Recipies</h1>
    <div className=" my-4 fs-5 d-flex gap-4 flex-wrap justify-content-center align-items-center">
      {countries&&countries.map((each) => (
        <NavLink key={each.strArea} className='btn btn-outline-dark p-2 flex-grow-1' to={each.strArea} country={each.strArea}>{each.strArea}</NavLink>
      )
    )}
    </div>
    </>
  )
}

export default Home
