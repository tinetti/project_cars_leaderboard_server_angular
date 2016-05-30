#!/bin/bash

curl -X PUT -H "Content-Type:application/json" --data '{"_id":"vSsyYScePGkaWQRtp","driver":"john","lapTime":"1:23.456","carName":"BMW M6","carClassName":"Road B","trackLocation":"BIR","trackVariation":"Short","createdAt":"2016-05-16T04:08:44.261Z","createdBy":"EWBriZA9R2NKCKsGu"}' http://localhost:3000/api/laps/vSsyYScePGkaWQRtp 
curl -X PUT -H "Content-Type:application/json" --data '{"_id":"Gf38AvsLnSjBs3C54","driver":"pauly","lapTime":"2:34.567","carName":"M3","carClassName":"Sweet","trackLocation":"BIR","trackVariation":"Long","createdAt":"2016-05-16T05:22:15.866Z","createdBy":"mZvHbvE8ciXNbEwdn"}' http://localhost:3000/api/laps/Gf38AvsLnSjBs3C54
curl -X PUT -H "Content-Type:application/json" --data '{"_id":"by5cTXkEHrcp742Xx","driver":"john","lapTime":"3:45.678","carName":"M6","carClassName":"Nice","trackLocation":"Bir ","trackVariation":"Short","createdAt":"2016-05-16T05:24:25.627Z","createdBy":"EWBriZA9R2NKCKsGu"}' http://localhost:3000/api/laps/by5cTXkEHrcp742Xx
