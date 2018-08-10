export const HSCodes = (input = '01') => {
  return fetch(`http://localhost:4000/hscodes/${input}`)
      .then((response) => response.json())
      .then((json) => {
         return json.filter(i => i.label.toLowerCase().includes(input.toLowerCase()));
      })
}