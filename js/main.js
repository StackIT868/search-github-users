$(document).ready(function(){
    console.log('ready');

    /*create event to catch user input search*/
    $('#searchUser').on('keyup', function(e){
        /*get the value of what is typed*/
        let username = e.target.value;

        /*make request to github using ajax*/
        $.ajax({
            url:'https://api.github.com/users/'+username,
            data:{
                client_id:'7b7530835d013ec6ec8c',
                client_secret:'18f5dae7e27e4b894a5639b8bddffee95f4f2d3d'
            }
        }).done(function(user){
            /*make request for repos*/
            $.ajax({
                url:'https://api.github.com/users/'+username+'/repos',
                data:{
                    client_id:'7b7530835d013ec6ec8c',
                    client_secret:'18f5dae7e27e4b894a5639b8bddffee95f4f2d3d',
                    sort: 'created: asc',
                    per_page: 5
                }
            }).done(function(repos){
                /*loop through repos*/
                $.each(repos, function(index, repo){
                  /*put into "repos" div*/
                  $('#repos').append(`
                        <div class="well">
                            <div class="row">
                                <div class="col-md-7">
                                    <strong>${repo.name}</strong>: ${repo.description}
                                </div>
                                <div class="col-md-3">
                                    <span class="label label-default">Forks: ${repo.forks_count}</span>
                                <span class="label label-primary">Watchers: ${repo.watchers_count}</span>
                                <span class="label label-success">Stars: ${repo.stargazers_count}</span>
                                </div>
                                <div class="col-md-2">
                                    <a href="${repo.html_url}" target="_blank" class="btn btn-default">Repo Page</a>
                                </div>
                            </div>
                        </div>
                    `);
                });
            });
            /*put into html*/
            /*get profile info*/
            $('#profile').html(`
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title">${user.name}</h3>
                    </div>
                    <div class="panel-body">
                        <div class="row">
                            <div class="col-md-3">
                                <img src="${user.avatar_url}" class="thumbnail avatar">
                                <a href="${user.html_url}" class="btn btn-primary btn-block" target="_blank">View Profile</a>
                            </div>
                            <div class="col-md-9">
                                <span class="label label-default">Public Repos: ${user.public_repos}</span>
                                <span class="label label-primary">Public Gists: ${user.public_gists}</span>
                                <span class="label label-success">Followers: ${user.followers}</span>
                                <span class="label label-info">Following: ${user.following}</span>
                                <br>
                                <br>
                                <ul class="list-group">
                                    <li class="list-group-item">Company: ${user.company}</li> 
                                    <li class="list-group-item">Website/Blog: ${user.blog}</li> 
                                    <li class="list-group-item">Location: ${user.location}</li> 
                                    <li class="list-group-item">Member Since: ${user.created_at}</li> 
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!--get repo info-->
                <h3 class="page-header">Latest Repos</h3>
                <div id="repos"></div>
            `);
        })
    });
});