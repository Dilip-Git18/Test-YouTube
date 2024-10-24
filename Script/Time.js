// Function to calculate the time since a given date
function timeSince(dateString) {
    const uploadDate = new Date(dateString);
    const today = new Date();
    const differenceInTime = today - uploadDate;
    const days = Math.floor(differenceInTime / (1000 * 3600 * 24));
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);
  
    if (years > 0) {
      return `${years} year${years !== 1 ? 's' : ''} ago`;
    } else if (months > 0) {
      return `${months} month${months !== 1 ? 's' : ''} ago`;
    } else {
      return `${days} day${days !== 1 ? 's' : ''} ago`;
    }
  }
  
  // Function to convert views to a readable format
  function formatViews(views) {
    if (views < 1000000) {
      return `${Math.floor(views / 100000)} lakh views`;
    } else {
      return `${(views / 1000000).toFixed(1)}M views`; // One decimal place for million views
    }
  }
  
  // Video data including upload dates and initial views
  const videos = [
    { id: 'stats1', views: 7500000, uploadDate: '2024-10-8' },
    { id: 'stats2', views: 9200000, uploadDate: '2024-09-12' },
    { id: 'stats3', views: 5200000, uploadDate: '2024-07-04' },
    { id: 'stats4', views: 4300000, uploadDate: '2024-04-27' },
    { id: 'stats5', views: 8000000, uploadDate: '2024-10-01' },
    { id: 'stats6', views: 64000000, uploadDate: '2019-01-19' },
    { id: 'stats7', views: 114000, uploadDate: '2024-10-13' },
    { id: 'stats8', views: 7700000, uploadDate: '2021-04-02' },
    { id: 'stats9', views: 412000000, uploadDate: '2017-01-13' },
    { id: 'stats10', views: 42000000, uploadDate: '2020-08-23' },
    { id: 'stats11', views: 5300000, uploadDate: '2024-09-25' },
    { id: 'stats12', views: 1600000, uploadDate: '2024-09-30' },
    { id: 'stats13', views: 250000, uploadDate: '2023-04-21' },
    { id: 'stats14', views: 2100000, uploadDate: '2022-11-24' },
    { id: 'stats15', views: 2000000, uploadDate: '2024-09-17' },
    { id: 'stats16', views: 4100000, uploadDate: '2023-07-02' },
  ];
  
  const lastUpdated = {};
  
  function updateStats() {
    const today = new Date();
    
    videos.forEach(video => {
      const statElement = document.getElementById(video.id);
      const time = timeSince(video.uploadDate);
      const uploadDate = new Date(video.uploadDate);
      const differenceInTime = today - uploadDate;
      const daysSinceUpload = Math.floor(differenceInTime / (1000 * 3600 * 24));
  
      // Initialize last updated time for each video
      if (!lastUpdated[video.id]) {
        lastUpdated[video.id] = new Date(video.uploadDate);
      }
  
      // Increase views only if 15 days have passed since last update
      if (daysSinceUpload >= 2) {
        const lastUpdateDays = Math.floor((today - lastUpdated[video.id]) / (1000 * 3600 * 24));
        if (lastUpdateDays >= 2) {
          video.views += 150000; // Increase views by 150,000
          lastUpdated[video.id] = today; // Update last updated time
        }
      }
  
      // Format views
      const formattedViews = formatViews(video.views);
      statElement.innerHTML = `${formattedViews} &#183 ${time}`;
    });
  }
  
  // Initial call to set the stats
  updateStats(); 
  
  // Update every 60 seconds
  setInterval(updateStats, 60000);