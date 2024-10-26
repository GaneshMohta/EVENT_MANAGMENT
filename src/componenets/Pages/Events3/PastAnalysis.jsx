import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Navbar from '../../Nabvar';
import axios from 'axios';
import Popup from '../Popup';
import "./eve3.css";
import * as d3 from "d3";


export default function PastAnalysis() {
    const {id} = useParams();
    const [loading,setLoading] = useState();
    const [cnt ,setCnt] = useState(0);
    const [analysis,setAnalysis]=useState([]);
    const [eventdata, setEventData] = useState();

    useEffect(() => {
      const fetchEvents = async () => {
        try {
          const response = await axios.get(`http://localhost:3003/post/${id}`);
          setEventData(response.data);
        } catch (err) {
          console.error('Error fetching events:', err);
        } finally {
          setLoading(false);
        }
      };
      fetchEvents();
    }, [id]);


    useEffect(() => {
        const fetchRegistration = axios.get(`http://localhost:3003/registration/${id}`);
        const fetchAnalysis = axios.get(`http://localhost:3003/registration/analysis/${id}`);

        Promise.all([fetchRegistration, fetchAnalysis])
          .then(([res1, res2]) => {
            console.log(res1.data.count);
            console.log("res2",res2.data);
            setCnt(res1.data.count);

            const pieData = [
              { label: "Registration", value: res1.data.count},
              { label: "Remaining", value: 100 - res1.data.count }
            ];
            createPieChart(pieData);
            setAnalysis(res2.data);
            createBarChart(res2.data);
          })
          .catch((error) => {
            console.error("Error fetching data", error);
          });
      }, [id]);

    const createPieChart = (data) => {
        const width = 350;
        const height = 350;
        const margin = 20;

        const radius = width / 2 - margin;

        d3.select("#pieChart").select("svg").remove();

        const svg = d3
          .select("#pieChart")
          .append("svg")
          .attr("width", width)
          .attr("height", height)
          .append("g")
          .attr("transform", `translate(${width / 2}, ${height / 2})`);

        const color = d3.scaleOrdinal(d3.schemeCategory10);
        const pie = d3
          .pie()
          .value((d) => d.value);
        const arc = d3
          .arc()
          .innerRadius(0)
          .outerRadius(radius);

        svg
          .selectAll("path")
          .data(pie(data))
          .enter()
          .append("path")
          .attr("d", arc)
          .attr("fill", (d) => color(d.data.label))
          .attr("stroke", "white")
          .style("stroke-width", "2px")
          .style("opacity", 0.7);

        svg
          .selectAll("text")
          .data(pie(data))
          .enter()
          .append("text")
          .text((d) => `${d.data.label}: ${d.data.value}`)
          .attr("transform", (d) => `translate(${arc.centroid(d)})`)
          .style("text-anchor", "middle")
          .style("font-size", 15);
      };

      const createBarChart = (data) => {
        const width = 300;
        const height = 350;
        const margin = { top: -20, right: 30, bottom: 40, left: 40 };

        d3.select("#barChart").select("svg").remove();
        const svg = d3
          .select("#barChart")
          .append("svg")
          .attr("width", width + margin.bottom)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", `translate(${margin.left},${margin.top})`);

        const x = d3
          .scaleBand()
          .domain(data.map((d) => d._id.gender))
          .range([0, width])
          .padding(0.1);

        const y = d3
          .scaleLinear()
          .domain([0, 10])
          .nice()
          .range([height, 50]);

        svg.append("g")
          .attr("transform", `translate(0,${height})`)
          .call(d3.axisBottom(x));

        svg.append("g")
          .call(d3.axisLeft(y));
        svg.selectAll("rect")
          .data(data)
          .enter()
          .append("rect")
          .attr("x", (d) => x(d._id.gender))
          .attr("y", (d) => y(d.count))
          .attr("width", x.bandwidth())
          .attr("height", (d) => height - y(d.count))
          .attr("fill", "orange");
    };



  return (
    <div>
        <Navbar />

        <div className='bg-slate-950 text-white'>
          <div className='text-center eve-head'><h1>Event Registration Studies</h1></div>
          <h1  className='text-center eve-head text-orange-400'>{eventdata?.eventName}</h1>
          <div className='flex justify-evenly event-analysis'>
          <div id="pieChart"> <h1 className='text-center'><span className='text-orange-600'>Collection : </span> ₹{eventdata?.price * 100}</h1></div>

          <div>
          <div id="barChart"><h1 className='text-center text-orange-600'>Gender analysis</h1></div>
          </div>
          </div>

        <div className='bg-slate-950 text-white'>
        <div className='text-center '>
          <h1>FeedBack and Rating</h1>
          <p>Feedbak is get from form</p>
        </div>
        </div>
        </div>
        <footer className="footer">
          <p>&copy; 2024, Ganesh@SECE Ltd. All Rights Reserved</p>
        </footer>
    </div>
  )
}
