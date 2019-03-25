export const HSCodes = (input = '01') => {
  return fetch(`${process.env.REACT_APP_NODE_API}/hscodes/${input}`)
      .then((response) => response.json())
      .then((json) => {
         return json.filter(i => i.label.toLowerCase().includes(input.toLowerCase()));
      })
}