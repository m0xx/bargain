# Search Module
    User configure providers + cron
    Start search
        Start a job with a repeatable patttern
        associate job id with search
        emit search:result
    Remove search
        stop job id
        keep feed
        
        
    Api:
        create
        update (stop job / restart)
        start
        delete
        
# Feed Module
    listen to Search module
    on search:result add result to user feed
    on feed:view update notification
    
# Notification Module
    listen to Search module
    on search:result aggregate notifications