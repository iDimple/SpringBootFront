package nju.wqy;

import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import net.sf.json.JSONObject;

@RequestMapping(value = "sparql")
@RestController
public class SparqlCtrl {
	String baseUrl="http://202.120.40.28:4460/data/query";
	@RequestMapping( method = RequestMethod.POST)
	public String getResult(@RequestBody Param query) {
		System.out.println(query.query);
		Map<String,String> params=new HashMap<String,String>();
		params.put("query", query.query);
		String result=APIManager.post(baseUrl,params);
		System.out.println(getHead(result));		
		return result;
	}
	
	String getHead(String result){
		if(result==null){return null;  }
		JSONObject obj=JSONObject.fromObject(result); 
		return obj.getJSONObject("head").getJSONArray("vars").toString();
		
	}
	
	String getBoby(String result) {
		if(result==null){return null;  }
		JSONObject obj=JSONObject.fromObject(result); 
		return obj.getJSONObject("head").getJSONArray("vars").toString();
	}
}
