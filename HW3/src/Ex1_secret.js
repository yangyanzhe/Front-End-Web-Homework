for(var a=0; a<9999; a++){
	

	if (decryptElementId.constructor != Array) {
			decryptElementId = [decryptElementId]
		}
		var b = false;
		for (var i = 0; i < decryptElementId.length; i++) {
			var c = document.getElementById(decryptElementId[i]);
			var d = c.title;
			try {
				var e = GibberishAES.dec(d, a);
				b = true;
				c.innerHTML = e;
				c.title = ""
			} catch (err) {}
		}
		if (b) {
			alert(a);
		}

}