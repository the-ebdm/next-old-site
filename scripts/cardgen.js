const urls = [
  "https://www.youtube.com/embed/?v=HYdiGro5JOQ",
  "https://player.vimeo.com/video/234677070",
  "https://vimeo.com/234677070",
  "https://www.youtube.com/watch?v=HYdiGro5JOQ",
  "https://youtu.be/HYdiGro5JOQ",
];

const extractId = (url) => {
	if(url.includes('vimeo')) {
		return [url.replace(/\?.*/,'').replace(/[^0-9]/g, ''), 'vimeo']
	} else {
		var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return [(match&&match[7].length==11)? match[7] : false, 'youtube'];
	}
};

urls.map(item => {
	// console.log(extractId(item));

	const [id, type] = extractId(item);

	console.log(`${type} - ${id}`)
})

// export default extractId;