import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

/**
 * 这里Audit 的audit 小写？
 */
// function Audit(age) {
//     if (age > 18) {
//         return <h1>成年人</h1>;
//     }
//     return <h1>未成年人</h1>
// }



// const Audit = React.createClass({
//     render: function() {
//         return (<h1>sd</h1>)
//     }
// });
function createMarkup() { return {__html: 'First &middot; Second'}; };





//let 
class Timer extends React.Component{
    constructor() {
        super();
        console.log('constructor')
        this.state = {
            // count: 0,
            // time: (new Date()).toLocaleTimeString()
            people:[{
                id:'1',
                name: 'zhangsan1'
            }, {
                id:'2',
                name: 'zhangsan2'
            },{
                id:'3',
                name: 'zhangsan3'
            }]
        }
        //this.handleClick = this.handleClick.bind(this)
    }
    //
    // static defaultProps ={
    //     age: 20
    // }

    // 如何进行props的类型检测
    //
    componentWillMount() {
        //
        // console.log('componentWillMount')
        // setInterval(() => {
        //     this.setState({
        //         count:1,
        //         color: '',
        //         time: (new Date()).toLocaleTimeString()
        //     });
        // }, 1000)
    }
    componentDidMount() {
        // var el = document.getElementById('sd');
        // el.style.color="red"
        console.log('componentDidMount')
        
    }
    componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps')
        
    }
    shouldComponentUpdate(nextProps, nextState) {
        console.log('shouldComponentUpdate')
        
        return true;
    }

    componentWillUpdate() {
        console.log('componentWillUpdate')
        

    }
    componentDidUpdate() {
        console.log('componentDidUpdate')
        
        
    }
    componentWillUnmount() {
        console.log('componentWillUnmount')
    }

    handleClick = (event) => {
        //alert(this.state.count);

        // event.stopPropagation();
        // event.preventDefault();

        //let type = event.type;
        // setTimeout(() => {
        //     console.log(event.type);
        // }, 0)
        // console.log(event.type);

        //
        //var el = document.getElementById('content');
        // this.contentRef.style.color = "red";
        // this.setState({
        //     color:'red'
        // });
        let people = this.state.people;
        // people[1] = {...people[1]};
        // people[1].name += 'haha'
        let newPeople = people.map((person) => {
            let newPerson = {...person};
            if (newPerson.id == '2') {
                newPerson.name += 'hah';
            }
            return newPerson;
        })
        
        this.setState({
            people: newPeople
        });
        
    }
    render() {
        return (<div onClick={this.handleClick}> 
                {/*<div style={{color: this.state.color}} ref={(content) => {this.contentRef = content;}}>
                    {this.state.time}
                </div>  */}
                <ul>
                {this.state.people.map((item, i) => {
                    return <Person key={Math.random()} item = {item}>
                       
                    </Person>
                })}
                </ul>
            </div>);
    }
}

class Person extends React.Component{

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.item.name !== this.props.item.name;
    }

    render() {
        console.log('render' + this.props.item.id);
        return <li>{this.props.item.name} ======  {this.props.children}</li>
    }
}

// Audit.defaultProps = {
//     age: 20
//   };

/**
 * 
 * 
 * <div data-title=""></div>
 * 
 */


 console.log(a);
 let a = 10;
 








 class InputComponent extends React.Component{
    componentWillReceiveProps() {

    }
    render() {
        return <div>{this.props.name}</div>
    }
 }

 class InputComponent2 extends React.Component{
    componentWillReceiveProps() {

    }
    render() {
        return <div>{this.props.name}</div>
    }
 }

//  function logProps(InputComponent) {
//     let oldMethod = InputComponent.prototype.componentWillReceiveProps;
//     InputComponent.prototype.componentWillReceiveProps = function(nextProps, nextState) {
//       console.log('============')
//       console.log('Current props: ', this.props);
//       console.log('Next props: ', nextProps);

//       //oldMethod(nextProps, nextState);
//     };
//     // The fact that we're returning the original input is a hint that it has
//     // been mutated.
//     return InputComponent;
// }
  
//   // EnhancedComponent will log whenever props are received
  

function logProps(WrappedComponent) {
    return class extends React.Component {
      componentWillReceiveProps(nextProps) {
        console.log('Current props: ', this.props);
        console.log('Next props: ', nextProps);
      }
      render() {
        // Wraps the input component in a container, without mutating it. Good!
        return <WrappedComponent {...this.props} />;
      }
    }
}



const EnhancedComponent = logProps(InputComponent);
const EnhancedComponent2 = logProps(InputComponent2);

 let name = 'mengqinghui';
 setInterval(() => {
    name += ' hah';
    ReactDOM.render(<EnhancedComponent name={name} />, document.getElementById('root'));
 }, 1000)
registerServiceWorker();
