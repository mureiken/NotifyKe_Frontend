export const WTOMembers = (input) => {
  return fetch(`http://localhost:4000/wtomembers/${input}`)
      .then((response) => response.json())
      .then((json) => {
         return json.filter(i => i.label.toLowerCase().includes(input.toLowerCase()));
      })
}