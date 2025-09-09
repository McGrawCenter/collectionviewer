      var config = {
        id: 'viewer',
        windows: [
        { manifestId: "https://etcpanel.princeton.edu/IIIF/manifests/instructions/manifest2.json" }
        ],
        catalog: [
        { manifestId: "https://media.getty.edu/iiif/manifest/02f4a5af-4bbe-4b4b-a6b6-0be316606b85" }
        ]
      }
      var mirador = Mirador.viewer(config);
      //console.log(Mirador);
      //console.log(mirador);
      
      
      
	    /*************************
	     * get the url vars
	     ***********************************/

	    function getURLValues() {

	        var search = window.location.search.replace(/^\?/, '').replace(/\+/g, ' ');
	        var values = {};

	        if (search.length) {
	            var part, parts = search.split('&');

	            for (var i = 0, iLen = parts.length; i < iLen; i++) {
	                part = parts[i].split('=');
	                values[part[0]] = window.decodeURIComponent(part[1]);
	            }
	        }
	        return values;
	    }
	    
	    /**************************
	     * if there is a manifest url var, load it
	     *************************************************/
	    var vars = getURLValues();
	    if (typeof vars.manifest !== 'undefined') {
	        var url = vars.manifest;
	        jQuery("#url").val(url);
	        //current.manifest = url;
	        
	        load(url);
	    }
	    
	    
	    function load(url) {

	          fetch(url)
	          .then(response => response.json())
	          .then((data) => {

		     if(data.type && data.type == 'Collection') { 
	                data.items.forEach((item,) => {
	                  addCard(item.id);
	                });
		     }
		     else if(data['@type'] && data['@type'] == 'sc:Collection') {
		  	console.log("Version 2");
	                data.manifests.forEach((item) => {
	                  addCard(item['@id']);
	                });		  	
		     }
	             else {
	               console.log('this is not a collection');
	             }
	          });

		  
	          
	          function addCard(manifest) {
  		     var x = new SimpleParser();
		     x.convert(manifest).then((output)=>{
		          var label = output.label;
		          var item = output.items[0];
		          jQuery("#gallery").append(`<a href="#" class="card" data-manifest="`+output.id+`">
  <div class="section media"><img src="`+item.serviceurl+`/full/300,/0/default.jpg"/></div>
  <div class="section label">
   <p>` + label + `</p>
  </div>
</a>`);	       
		     });

	          }
    
	    }	    	          
      
      
      
      jQuery(document).on("click",'.card',function(e){
        var manifest = jQuery(this).attr('data-manifest');
        addManifestToMirador(manifest);  
        e.preventDefault();
      });
      
      
      
      
      function addManifestToMirador(manifest) {
        //var action = Mirador.updateWorkspace(config);
        //mirador.store.dispatch(action);  

        //config.windows.push({ manifestId: "https://data.artmuseum.princeton.edu/iiif/objects/36161" });
        //var action = Mirador.importConfig(config);
        //mirador.store.dispatch(action);
        
        var action = Mirador.addResource(manifest);
        mirador.store.dispatch(action);
        
        var action = Mirador.addWindow({manifestId: manifest});
        mirador.store.dispatch(action); 
      }   
      
      
      
      
         
      
      function openAside() {
        jQuery('#panel').addClass("shown");
      }
      function closeAside() {
        jQuery('#panel').removeClass("shown");
      }
      
      jQuery(".open").click(function(e){
        var g = jQuery('#panel');
        if(g.hasClass("shown")) {
          closeAside();
        }
        else {
          openAside();
        }
        e.preventDefault();
      });
      

/*
 getWindows
 getWorkspace
 
*/


