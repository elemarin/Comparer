import React from "react";
import { useState } from "react";
import axios from "axios";
import "./styles.css";
import getMetrics from "./metrics";
import budgets from "./budgets";

function filterMetrics(object, metrics){
	var object = Object.flatten(object);
	var list = [];
	
	metrics.forEach(metric => {
		if(object[metric]){
			list.push({
				key: metric,
				value: object[metric]
			})
		}
	});

	return list;
}

function Form() {
	const metrics = getMetrics();
	const [testUrl, setTestUrl] = useState("");
	const [data, setData] = useState([]);
	const [platform, setPlatform] = useState("Desktop");
	const [page, setPage] = useState("New Page");

	async function getData(testUrl){
		setData([]);
		let url = testUrl.replace('https://', '');
		let segments = url.split("/");
		const id = segments[2];
		const dataUrl = "https://webpagetest.org/jsonResult.php?test=" + id + "&pretty=1";
		const result = await axios(dataUrl);
		
		var filtered = filterMetrics(result.data.data.median.firstView, metrics)
		console.log("filtered!: ", filtered);
		setData(filtered);
	}

	return (
		<div>
			<div className="row">
				<h5>Webpagetest Test Link</h5>
				<div className="input-field col s12">
					<input onChange={(event)=> {setTestUrl(event.target.value)}} id="email" type="text" className="validate" />
					<label htmlFor="email">Webpagetest URL</label>
				</div>
			</div>

			<button onClick={ ()  => getData(testUrl) } className="btn waves-effect waves-light" type="submit" name="action">
				Submit
			</button>

			<br></br>
			<br></br>
			<br></br>

			<div className="row">
					<h5>Filters</h5>
					<div className="col s6">
						<label>Platform</label>
						<select className="browser-default" onChange={ (event)=>setPlatform(event.target.value)}>
							<option value="Desktop" selected>Desktop</option>
							<option value="Mobile">Mobile</option>
						</select>
					</div>

					<div className="col s6">
						<label>Page</label>
						<select className="browser-default" onChange={ (event)=>setPage(event.target.value)}>
							<option value="New Page" selected>New Page</option>
							<option value="Community Results">Community Results</option>
						</select>
					</div>
			</div>

			<br></br>
			<br></br>
			<br></br>

			<div className="row">

				<h5>Results</h5>
				<table>
					<thead>
						<tr>
							<th>Metric</th>
							<th>Budget</th>
							<th>Value</th>
						</tr>
					</thead>

					<tbody>

						{
							data.map( metric => {
								let budget = budgets[platform][page][metric.key];
								let isOnBudget = budget ? metric.value < budget : undefined;
								let color = isOnBudget ? "budget--green" : (budget ? "budget--red" : "");
								return(
									<tr>
										<td>{metric.key}</td>
										<td>{budget ? budget : "-"}</td>
										<td className={color}>{metric.value}</td>
									</tr>
								)
							})
						}

					</tbody>
				</table>
			</div>

		</div>
	);
}

export default function App() {
	return (
		<div className="App">
			<Form />
		</div>
	);
}

Object.flatten = function(data) {
    var result = {};
    function recurse (cur, prop) {
        if (Object(cur) !== cur) {
            result[prop] = cur;
        } else if (Array.isArray(cur)) {
			for(var i=0, l=cur.length; i<l; i++)
				recurse(cur[i], prop + "[" + i + "]");
            if (l == 0)
                result[prop] = [];
        } else {
            var isEmpty = true;
            for (var p in cur) {
                isEmpty = false;
                recurse(cur[p], prop ? prop+"."+p : p);
            }
            if (isEmpty && prop)
                result[prop] = {};
        }
    }
    recurse(data, "");
    return result;
}