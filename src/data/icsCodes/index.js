export const ICSCodes = (input) => {
  return fetch(`${process.env.REACT_APP_NODE_API}/icscodes/${input}`)
      .then((response) => response.json())
      .then((json) => {
         return json.filter(i => i.label.toLowerCase().includes(input.toLowerCase()));
      })
}