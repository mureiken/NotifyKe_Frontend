export const WTOMembers = (input) => {
	return fetch(`${process.env.REACT_APP_NODE_API}/wtomembers/${input}`)
      .then((response) => response.json())
      .then((json) => {
         return json.filter(i => i.label.toLowerCase().includes(input.toLowerCase()));
      })
}