export default // Quake View handler
class QuakesView {
  renderQuakeList(quakeList, listElement) {
    listElement.innerHTML = quakeList.features
      .map(quake => {
        return `<li data-id=${quake.id} class = "quakeList">${quake.properties.title}, ${new Date(
          quake.properties.time
        )}</li>`;
      })
      .join('');
  }
  
  renderQuake(quake, element) {
    const quakeProperties = Object.entries(quake.properties);
    console.log(quakeProperties);
    const output = `
    <li>Type: ${quake.properties.type}</li>
    <li>Mag: ${quake.properties.mag}</li>
    <li>Place: ${quake.properties.place}</li>
    <li>Time: ${new Date(quake.properties.time)}</li>
    <button id="backButton">Back</button>`;
    element.innerHTML = output;
    const backButton = element.querySelector("#backButton");
    backButton.addEventListener("click", goBack);
    console.log(backButton);
    function goBack() {
      window.history.go(0);
    }
  }
}