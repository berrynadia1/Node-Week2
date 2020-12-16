//http://localhost:3030/employees/
var express = require('express')

var app = express()

var data = require('./employees.json')

app.get('/employees', (req, res) =>{
    if(!data){
        res.status(404).send('Could not find information')
    }
    res.send(data)
    })
    
    app.get('/employees/:id', (req, res) =>{
    
    
    const findEmployee = data.employees.find(function(employees){
    
        return parseInt(req.params.id) === employees.id
    })
    
        if(!findEmployee){
            res.status(404).send('Could not find information')
        }
        res.send(findEmployee)
        })

        
app.put('/employees/:employees_id', (req, res) => {
            const {
              employees_id
            } = req.params
          
            const {
              completed
            } = req.body
          
            fs.readFile("./employees.json", "utf-8", (err, data) => {
              if (err) res.send(false)
                const employees = JSON.parse(data)
          
                const newEmployee = employees.map((todo) => {
                  if (employees.id == employees_id) {
                    return {
                      ...employees,
                      id: employees.id,
                      completed: completed
                    }
                  }
          
                  return employees
                })
          
                fs.writeFile('employees.json', JSON.stringify(newEmployee), (err) => {
                  if (err) res.send(false);
                  console.log('Data written to file');
                });
            })
          
            res.send(true)
          })

    
          app.delete('/employees/:employees_id', (req, res) => {
            const {
              employees_id
            } = req.params
            fs.readFile("./employees.json", "utf-8", (err, data) => {
              if (err) res.send(false)
                const employees = JSON.parse(data)
          
                const newEmployee = employees.filter((todo) => employees.id != employees_id)
          
                fs.writeFile('employees.json', JSON.stringify(newEmployee), (err) => {
                  if (err) res.send(false);
                  console.log('Data written to file');
                });
            })
            
            res.send(true)
          })        
        
        
        
          app.post('/employees', (req, res) => {
            fs.readFile("./employees.json", "utf-8", (err, data) => {
              if (err) res.send(false)
                console.log(data);
                const employees = JSON.parse(data)
                
                const {
                  description 
                } = req.body
          
                const tempEmployee = {
                  id: employees.length,
                  description,
                  completed: false
                }
          
                const newEmployee = [...employees, tempEmployee]
          
                fs.writeFile('employees.json', JSON.stringify(newEmployee), (err) => {
                  if (err) res.send(false);
                  console.log('Data written to file');
                });
            })
            
            res.send(true)
          })        
          
        const port = 3030

    app.listen(port, () =>{
        
            console.log(`I am using ${port}`)
        })