const url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json';
const req = new XMLHttpRequest();

req.open('GET', url);

req.onload = () => {
    data = JSON.parse(req.responseText);
    const doped = data.filter(i => i.Doping !== "");
    const clean = data.filter(i => i.Doping === "");

    const doped_x = doped.map(i => i.Year);
    const clean_x = clean.map(i => i.Year);

    const doped_time = doped.map(i => i.Time);
    const clean_time = clean.map(i => i.Time);

    const doped_date = doped_time.map(i => new Date(2000,10,4,3,i[0]+i[1], i[3]+i[4]));
    const clean_date = clean_time.map(i => new Date(2000,10,4,3,i[0]+i[1], i[3]+i[4]));

    c3.generate({
        size: {
            height: 600,
            width: 800
        },
        point: {
            r: 6
        },
        data: {
            xs: {
                'Riders with doping allegations': 'doped_x',
                'No doping allegations': 'clean_x'
            },
            columns: [
                ['doped_x', ...doped_date],
                ['clean_x', ...clean_date],
                ['Riders with doping allegations', ...doped_x],
                ['No doping allegations', ...clean_x]

            ],
            type: 'scatter'
        },
        axis: {
            rotated: true,
            x: {
                type: 'timeseries',
                tick: {
                    format: '%M:%S'
                },
                label: 'Time in minutes'
            },
            y: {
                max: 2015,
                min: 1995
            }
        },
        tooltip: {
            format: {
                value: function(value, ratio, id, index) {
                    const dataset = id === "Riders with doping allegations" ? doped : clean;
                    const athlete = dataset[index];
                    const result = athlete.Name + ':' + athlete.Nationality + '<br>'
                        + 'Year: ' + athlete.Year + '<br>'
                        + 'Time: ' + athlete.Time + '<br>'
                        + athlete.Doping + '<br>'
                        + athlete.URL;
                    return result;
                },
            },
        }
    });
}

req.send();