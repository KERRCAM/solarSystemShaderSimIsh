#ifdef GL_ES 
precision mediump float; 
#endif 

precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;

float sdfCircle(vec2 p, float r) {
  // note: sqrt(pow(p.x, 2.0) + pow(p.y, 2.0)) - r;
  return length(p) - r;  
} 

float sdfCircle2(vec2 p, float r) {
  return length(p) - r;  
} 

float sdfCircle3(vec2 p, float r) {
  return length(p) - r;  
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  uv = uv - 0.5;
  uv = uv * u_resolution / 50.0;
 
  vec3 t1 = vec3(0.3725, 0.298, 0.0235); 
  vec3 t2 = vec3(0.8667, 0.749, 0.0902);  
  vec3 t3 = vec3(0.0235, 0.6353, 0.898);  
  vec3 t4 = vec3(0.7373, 0.6784, 0.0392); 
  vec3 t5 = vec3(0.0, 0.0, 0.0);  
  vec3 t6 = vec3(0.7922, 0.0471, 0.0471); 
  vec3 black = vec3(0.0);
  vec3 white = vec3(1.0);
  vec3 red = vec3(1.0, 0.0, 0.0);
  vec3 blue = vec3(0.65, 0.85, 1.0); 
  vec3 darkBlue = vec3(0, 0, 1);
  vec3 orange = vec3(0.9, 0.6, 0.3);
  vec3 color = black; 
  color = vec3(uv.x, uv.y, 0.0); 
  vec3 color2 = black; 
  color2 = vec3(uv.x, uv.y, 0.0); 
  vec3 color3 = black; 
  color3 = vec3(uv.x, uv.y, 0.0);

  //sun
  float radius = 0.25;
  vec2 center = vec2(0.0, 0.0);
  center = vec2(sin(0.2 * u_time * 0.97)*0.35, cos(0.2 * u_time)*0.35);
  float distanceToCircle = sdfCircle(uv - center, radius);
  color = distanceToCircle > 0.0 ? t1 : t2;
  color = color / (1.0 - exp(-2.0 * abs(distanceToCircle)));
  color = color * 0.8 + color * 0.2;
  color = color * 0.8 + color * 0.2 * sin(50.0 * distanceToCircle);
  color = color * 1.5 + t2 * 0.2 * sin(100.0 * distanceToCircle - 4.0 * u_time);
  //color = mix(white, color, step(0.1, distanceToCircle));
  //color = mix(white, color, step(0.12, abs(distanceToCircle)));
  color = mix(white, color, 1.5 * abs(distanceToCircle));

  //mercury
  float radius2 = 0.005;
  vec2 center2 = vec2(0.0, 0.0);
  center2 = vec2(sin(1.6 * u_time)*3.0, cos(1.6 * u_time)*3.0);
  float distanceToCircle2 = sdfCircle2(uv - center2, radius2);
  color2 = distanceToCircle2 > 0.0 ? t4 : t5;
  color = color / (1.0 - exp(-2.0 * abs(distanceToCircle2)));
  color = color * 0.8 + color * 0.2;
  //color = mix(t6, color, step(0.12, abs(distanceToCircle2)));
  color = mix(t6, color, 1.5 * abs(distanceToCircle2)); 

  //venus 
  float radius3 = 0.009;
  vec2 center3 = vec2(0.0, 0.0);
  center3 = vec2(sin(0.6 * u_time)*5.0, cos(0.6 * u_time)*5.0);
  float distanceToCircle3 = sdfCircle3(uv - center3, radius3);
  color3 = distanceToCircle3 > 0.0 ? t4 : t5;
  color = color / (1.0 - exp(-2.0 * abs(distanceToCircle3)));
  color = color * 0.8 + color * 0.2;
  color = mix(t4, color, step(0.12, abs(distanceToCircle3)));
  color = mix(t4, color, 1.5 * abs(distanceToCircle3)); 

  gl_FragColor = vec4(color, 1.0); 
} 

//737100