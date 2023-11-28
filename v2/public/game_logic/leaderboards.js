const leaderboardsTable = document.getElementById('leaderboards-table');


function generateTable(data) {
	let tableHTML = '<table><tr><th>*NAME*</th><th>*SCORE*</th></tr>';
	for (let i = 0; i < data.length; i++) {
	    let name = data[i][0];
	    if(i==0){
	    	name += ' 🥇'
	    }
	    if(i==1){
	    	name += ' 🥈'
	    }
	    if (i==2){
	    	name += ' 🥉'
	    }
	    let score = data[i][1];
	    tableHTML += '<tr><td>' + name + '</td><td>' + score + '</td></tr>';
	}
	tableHTML += '</table>';
	return tableHTML;
}

fetch('/api/leaderboards')
  .then(response => {
    if (!response.ok) {
      throw new Error('err');
    }
    // Parse JSON data from the response
    return response.json();
  })
  .then(data => {
    // Log the received JSON data
    console.log('Received data:', data);
    
    leaderboardsTable.innerHTML = generateTable(data['values']);
  })
  .catch(error => {
    // Log any errors that occurred during the fetch
    console.error('Fetch error:', error);
  });
