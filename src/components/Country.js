import React, {useEffect, useState} from 'react'
import { useParams, NavLink } from 'react-router-dom'
import Unknown from './Unknown'

const Country = () => {
  const [countryMeals, setCountryMeals] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const param = useParams()
  const country = param.country

  useEffect(() => {

      // fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${country}`)
      // .then(res => res.json())
      // .then((data) => setCountryMeals(data.meals))
      const fetchData = async () => {
        try {
          const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${country}`)

          if(!response.ok){
            throw new Error(`HTTP Response Error: ${response.status}`);
          }



          const result = await response.json()
          setCountryMeals(result.meals)
        } catch (err) {
          setError(err)
        } finally {
          setLoading(false)
        }
      }
      fetchData()
    }, [country]);
    if(loading) return <h2>LOADING...</h2>
    if(error) return <h2>Error: {error}</h2>
    if(!countryMeals) return <Unknown />

  return (
    <div className='p-5'>

      <NavLink to={'/'} style={{textDecoration:'none', color:'black', fontWeight: 'bold'}}>←Back to Countries List</NavLink>
      <h2 className='mt-4 text-center'>{country} Meals</h2>
      {countryMeals&&countryMeals.map((each,i) => (
        <NavLink key={each.idMeal} className='p-2 btn btn-outline-dark d-block m-2 text-start' to={each.idMeal}>{i+1}- {each.strMeal}</NavLink>
        )
      )}
    </div>
  )
}

export default Country
