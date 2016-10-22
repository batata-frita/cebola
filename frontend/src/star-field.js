import axios from 'axios'
import R from 'ramda'

const getStars = (user) => axios.get(`https://api.github.com/users/${user}/starred`).then((response) => response.data)

export default (users) => (
  Promise.all(users.map(getStars))
    .then(R.unnest)
    .then(R.groupWith((a, b) => a.id === b.id))
    .then(R.map((group) => ({ ...group[0], count: group.length })))
    .then(R.sortBy(R.prop('count')))
)
