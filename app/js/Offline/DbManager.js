//alert(navigator.userAgent.indexOf("Safari"));
//alert(navigator.userAgent.indexOf("Chrome"));

if (navigator.userAgent.indexOf("Safari") >= 0 && navigator.userAgent.indexOf("Chrome") < 0) {
    var DataBaseManager = {
        Offlinedb: openDatabase(OfflineConfiguration.DB_NAME, '', 'my first database', 2 * 1024 * 1024),
        initializeDataBase: function () {
            var self = this;
            self.Offlinedb.transaction(function (tx) {
                console.log("initializeDataBase called");
                tx.executeSql('CREATE TABLE IF NOT EXISTS UserData (UserID INTEGER PRIMARY KEY AUTOINCREMENT, Name, Email, Technology)');
                console.log("initializeDataBase finished");
            });
        },
        AddnewUser: function (data, callback) {
            
            this.initializeDataBase();
            var self = this;
            self.Offlinedb.transaction(function (tx) {
                var query = "insert into UserData(Name,Email,Technology) values(?,?,?)";
                tx.executeSql(query, [data.Name, data.Email, data.Technology], function (tx, results) {
                    if (callback) callback("User Saved");
                });
            });
        },
        GetSingleUser: function (data, callback) {
            try {
                var self = this;
                this.initializeDataBase();
                var query1 = "SELECT * from UserData where UserID=" + data;
                self.Offlinedb.transaction(function (tx) {
                    tx.executeSql(query1, [], function (tx, results) {
                        if (results.rows.length > 0) {
                            var v = results.rows.item(0);
                            if (callback) callback(results.rows.item(0));
                        } else {
                            if (callback) callback("Not Found");
                        }
                    });

                });

            }
            catch (e) {
                console.log(" error occured in selecting data");
            }

        },
        GetAllUser: function (callback) {
            try {
                var self = this;
                this.initializeDataBase();
                var query1 = "SELECT * from UserData";
                self.Offlinedb.transaction(function (tx) {
                    tx.executeSql(query1, [], function (tx, results) {
                        //alert(results);
                        if (results.rows.length > 0) {
                            var data=[];
                            for (var i = 0; i < results.rows.length; i++) {
                                data.push(results.rows.item(i));
                            }
                            if (callback) callback(data);
                        } 
                    });

                });

            }
            catch (e) {
                console.log(" error occured in selecting data");
            }

        },
        UpdateUser: function (data, callback) {
            try {
                this.initializeDataBase();
                var self = this;
                var query1 = "update UserData set Name=?,Email=?,Technology=? where UserID=?";
                self.Offlinedb.transaction(function (tx) {
                    tx.executeSql(query1, [data.Name, data.Email, data.Technology, parseInt(data.UserID)], function (tx, results) {
                        if (callback) callback("Response updated");
                    });
                });

            }
            catch (e) {
                console.log(" error occured in selecting data");
            }
        },
        DeleteUser: function (data, callback) {
            try {
                this.initializeDataBase();
                var self = this;
                self.Offlinedb.transaction(function (tx) {
                    tx.executeSql("Delete from UserData where UserID=?", [data], function (tx, results) {
                        if (callback) callback("Data deleted");
                    });
                });

            }
            catch (e) {
            }
        }

    } //Db manager end

} else {
    
    var DataBaseManager = {
        AddnewUser: function (data, callback) {
            debugger;
            db.open({
                server: OfflineConfiguration.DB_NAME,
                version: OfflineConfiguration.Db_VERSION,
                schema: OfflineConfiguration.SCHEMA

            }).done(function (s) {
                self.Server = s;
                self.Server.UserData.add(data).done(function (results) {
                    if (callback) callback("Data added into UserData");
                });
            });
        },
        GetSingleUser: function (data, callback) {
            db.open({
                server: OfflineConfiguration.DB_NAME,
                version: OfflineConfiguration.Db_VERSION,
                schema: OfflineConfiguration.SCHEMA

            }).done(function (s) {
                self.Server = s
                self.Server.UserData
                       .query()
                        .all()
                        .filter(function (result) {
                            return result.UserID === parseInt(data);
                        })
                        .execute()
                        .done(function (finalResult) {
                            if (callback) callback(finalResult);
                        });
            });

        },
        GetAllUser: function (callback) {
            db.open({
                server: OfflineConfiguration.DB_NAME,
                version: OfflineConfiguration.Db_VERSION,
                schema: OfflineConfiguration.SCHEMA

            }).done(function (s) {
                self.Server = s
                self.Server.UserData
                       .query()
                        .all()
                        .execute()
                        .done(function (finalResult) {
                            if (callback) callback(finalResult);
                        });
            });

        },
        UpdateUser: function (data, callback) {
            debugger;
            db.open({
                server: OfflineConfiguration.DB_NAME,
                version: OfflineConfiguration.Db_VERSION,
                schema: OfflineConfiguration.SCHEMA

            }).done(function (s) {
                self.Server = s
                self.Server.UserData.update(data).done(function (item) {
                    if (callback) callback("response updated to database");
                });
            });
        },
        DeleteUser: function (data, callback) {
            var self = this;
            db.open({
                server: OfflineConfiguration.DB_NAME,
                version: OfflineConfiguration.Db_VERSION,
                schema: OfflineConfiguration.SCHEMA

            }).done(function (s) {
                self.Server = s
                self.Server.UserData.remove(data).done(function (a) {
                    if (callback) callback("Data deleted");
                });
            });
        }
    } // DB manage end
    //alert('DataBaseManager Open object is created');
}  //Else block end