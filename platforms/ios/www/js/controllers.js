angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, ChatData) {
  
  ChatData.get().then(function (msg) {
        $scope.chats = msg.data.data;
         console.log($scope.chats);
    });
 

  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope) {
})
    

.controller('AccountCtrl', function($state,$scope,$filter,$http,transformRequestAsFormPost) {
  
  $scope.login=

  function(passd,user){
  	 var t0 =$filter('date')(new Date(), 'ss sss');
   
     
    $http({
    method: 'post',
    url: 'http://dev.apppartner.com/AppPartnerProgrammerTest/scripts/login.php',
    transformRequest: transformRequestAsFormPost,
    data:{username:user,password:passd},
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    
    }).success(function (data, status, headers, config) {
          
           
           alert(data.code+" "+data.message); 
            
             t1 =$filter('date')(new Date(), 'ss sss');
            
           alert("It took " + (parseInt(t1.replace(' ',''),10)-parseInt(t0.replace(' ',''),10)) + " milliseconds.");
           $state.go("dash");// assign  $scope.persons here as promise is resolved here 
        }).error(function (data, status, headers, config) {
            $scope.status = status + ' ' + headers;
        });
};  
}).factory(
            "transformRequestAsFormPost",
            function() {

                // I prepare the request data for the form post.
                function transformRequest( data, getHeaders ) {

                    var headers = getHeaders();

                    headers[ "Content-type" ] = "application/x-www-form-urlencoded; charset=utf-8";

                    return( serializeData( data ) );

                }


                // Return the factory value.
                return( transformRequest );


                // ---
                // PRVIATE METHODS.
                // ---


                // I serialize the given Object into a key-value pair string. This
                // method expects an object and will default to the toString() method.
                // --
                // NOTE: This is an atered version of the jQuery.param() method which
                // will serialize a data collection for Form posting.
                // --
                // https://github.com/jquery/jquery/blob/master/src/serialize.js#L45
                function serializeData( data ) {

                    // If this is not an object, defer to native stringification.
                    if ( ! angular.isObject( data ) ) {

                        return( ( data == null ) ? "" : data.toString() );

                    }

                    var buffer = [];

                    // Serialize each key in the object.
                    for ( var name in data ) {

                        if ( ! data.hasOwnProperty( name ) ) {

                            continue;

                        }

                        var value = data[ name ];

                        buffer.push(
                            encodeURIComponent( name ) +
                            "=" +
                            encodeURIComponent( ( value == null ) ? "" : value )
                        );

                    }

                    // Serialize the buffer and clean it up for transportation.
                    var source = buffer
                        .join( "&" )
                        .replace( /%20/g, "+" )
                    ;

                    return( source );

                }

            }
        );
