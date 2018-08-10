export const ICSCodes = (input) => {
  return fetch(`http://localhost:4000/icscodes/${input}`)
      .then((response) => response.json())
      .then((json) => {
         return json.filter(i => i.label.toLowerCase().includes(input.toLowerCase()));
      })
}