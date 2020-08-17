let metrics = [
    "render", 
    "chromeUserTiming.firstMeaningfulPaint",
    "chromeUserTiming.firstContentfulPaint",
    "chromeUserTiming.CumulativeLayoutShift",
    "TTIMeasurementEnd",
    "TTFB",
    "breakdown.js.bytes",
    "breakdown.css.bytes",
    "breakdown.image.bytes"
]

export default function getMetrics(){
    return metrics;
}
