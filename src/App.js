import React from "react";
import { useState } from "react";
import axios from "axios";
import "./styles.css";
import getMetrics from "./metrics";
import budgets from "./budgets";

function filterMetrics(object, metrics){
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

	async function getData(testUrl){
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
				<div className="input-field col s12">
					<input onChange={(event)=> {setTestUrl(event.target.value)}} id="email" type="text" className="validate" />
					<label htmlFor="email">Webpagetest URL</label>
				</div>
			</div>

			<button onClick={ ()  => getData(testUrl) } className="btn waves-effect waves-light" type="submit" name="action">
				Submit
			</button>

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
							let budget = budgets[metric.key];
							let isOnBudget = budget ? metric.value < budget : undefined;
							let color = isOnBudget ? "budget--green" : (budget ? "budget--red" : "");
							return(
								<tr>
									<td>{metric.key}</td>
									<td>{budget ? budget : ""}</td>
									<td className={color}>{metric.value}</td>
								</tr>
							)
						})
					}

				</tbody>
			</table>

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
