
$(document).ready(function(){
                  // $("#bar").bind("pagebeforecreate",function(){
                  //                alert("trigger pagebeforecreate")
                  //                })
                  // $("#bar").bind("pagecreate",function(){
                  //                alert("trigger pagecreate")
                  //                })
                  // $("#bar").bind("pageinit",function(){
                  //                alert("trigger pageinit")
                                 
                  //                })
                 $("#gotofoo").bind("click",function(){
                 	
                      $("#bar").bind("pagebeforechange",function(){
                     alert("trigger pagebeforechange")
                     }) 
                     $("#bar").bind("pagechange",function(){
                     alert("trigger pagechange")
                     }) 
                 			$.mobile.changePage("#foo");
                 
                 }) 
                  $("#bar").bind("pagebeforeload",function(){
                                                alert("trigger pagebeforeload")
                                                }) 
                 $("#bar").bind("pageload",function(){
                                alert("trigger pageload")
                                }) 
                 $("#bar").bind("pageloadfailed",function(){
                                alert("trigger pageloadfailed")
                                }) 
                 
                 $("#bar").bind("pagechangefailed",function(){
                 alert("trigger pagechangefailed")
                 }) 
                 $("#bar").bind("pagechangefailed",function(){
                 alert("trigger pagechangefailed")
                 })
                 
                 $("#foo").bind("pagebeforeshow",function(){
                 alert("trigger pagebeforeshow")
                 })
                 $("#foo").bind("pagebeforehide",function(){
                 alert("trigger pagebeforehide")
                 })
                 $("#foo").bind("pageshow",function(){
                 alert("trigger pageshow")
                 })
                 $("#foo").bind("pagehide",function(){
                 alert("trigger pagehide")
                 })
                 $("#testid").bind("tap",function(){
                 console.log("trigger tap")
                 })
                 $("#testid").bind("taphold",function(){
                 console.log("trigger taphold")
                 })
                 $("#testid").bind("vclick",function(){
                 console.log("trigger vclick")
                 }) 
                 $("#testid").bind("vmousedown",function(){
                 console.log("trigger vmousedown")
                 }) 
                 $("#testid").bind("vmouseup",function(){
                 console.log("trigger vmouseup")
                 }) 
                 $("#testid").bind("vmousecancel",function(){
                 console.log("trigger vmousecancel")
                 }) 
                 // $("#testid").bind("vmousemove",function(){
                 // console.log("trigger vmousemove")
                 // })
                  })
                            
                  
                  
                

